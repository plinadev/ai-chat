/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from 'rxjs';
import { File } from './schemas/files.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { SFNClient, StartExecutionCommand } from '@aws-sdk/client-sfn';
import { Pinecone } from '@pinecone-database/pinecone';
import { Chat } from 'src/chat/schemas/chat.schema';

@Injectable()
export class FilesService {
  private s3: S3Client;
  private sfn: SFNClient;
  private logger = new Logger(FilesService.name);
  private userStreams: Record<string, Subject<any>> = {};
  private pinecone: Pinecone;
  constructor(
    @InjectModel(File.name)
    private fileModel: Model<File>,
    @InjectModel(Chat.name)
    private chatModel: Model<Chat>,
  ) {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    this.sfn = new SFNClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }

  async generateUploadUrl(userEmail: string, originalFilename: string) {
    const sanitizedFilename = originalFilename.replace(/\s+/g, '_');
    const s3Filename = `${uuidv4()}-${sanitizedFilename}`;
    const bucket = process.env.AWS_S3_BUCKET;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: s3Filename,
      ContentType: 'application/pdf',
    });

    const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 60 });

    const file = new this.fileModel({
      userEmail,
      userFilename: originalFilename,
      s3Filename,
      status: 'pending',
    });

    await file.save();

    return {
      uploadUrl,
      s3Filename,
      fileId: file._id,
    };
  }

  async startProcessing(fileId: string, userEmail: string) {
    const file = await this.fileModel.findById(fileId);
    if (!file || file.userEmail !== userEmail) {
      throw new NotFoundException('File not found or not owned by user');
    }

    await this.startProcessingWorkflow({
      fileId,
      userEmail,
      bucket: process.env.AWS_S3_BUCKET,
      key: file.s3Filename,
      filename: file.userFilename,
    });

    return { started: true };
  }

  async getFileByEmail(userEmail: string) {
    return this.fileModel.findOne({ userEmail }).sort({ createdAt: -1 }).lean();
  }
  async getFileStatusByEmail(userEmail: string) {
    const file = await this.fileModel
      .findOne({ userEmail })
      .sort({ createdAt: -1 })
      .lean();

    return file?.status;
  }

  async deleteFile(fileId: string, userEmail: string) {
    const file = await this.fileModel.findById(fileId);
    if (!file) {
      throw new NotFoundException('File not found');
    }

    if (file.userEmail !== userEmail) {
      throw new ForbiddenException('You are not allowed to delete this file');
    }

    //delete from pinecone
    try {
      const index = this.pinecone.index('ai-chat-index');
      await index.deleteMany({
        fileId,
      });
      this.logger.log(`Deleted vectors from Pinecone for file ${fileId}`);
    } catch (error) {
      this.logger.error('Failed to delete vectors from Pinecone', error);
    }
    //delete from s3
    try {
      const bucket = process.env.AWS_S3_BUCKET!;
      const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: file.s3Filename,
      });
      await this.s3.send(command);
      this.logger.log(`Deleted file from S3: ${file.s3Filename}`);
    } catch (error) {
      this.logger.error('Failed to delete file from S3', error);
    }

    //delete chat history
    try {
      // Delete all chat messages related to this file and user
      await this.chatModel.deleteMany({ fileId, userEmail });
      this.logger.log(`Deleted chat messages from MongoDB for file ${fileId}`);
    } catch (error) {
      this.logger.error('Failed to delete chat messages from MongoDB', error);
    }

    //delete from mongodb
    await this.fileModel.deleteOne({ _id: fileId });
    this.logger.log(`Deleted file document ${fileId} from MongoDB`);

    return { success: true };
  }

  private async startProcessingWorkflow(input: Record<string, any>) {
    const stateMachineArn = process.env.STEP_FUNCTION_ARN;
    if (!stateMachineArn) {
      this.logger.error('STEP_FUNCTION_ARN not set');
      if (input.fileId) {
        await this.fileModel.findByIdAndUpdate(input.fileId, {
          status: 'error',
        });
      }
      return;
    }

    try {
      const command = new StartExecutionCommand({
        stateMachineArn,
        input: JSON.stringify(input),
      });

      const res = await this.sfn.send(command);
      this.logger.log(`Started Step Function execution: ${res.executionArn}`);
    } catch (err) {
      this.logger.error('Failed to start Step Function', err);

      if (input.fileId) {
        await this.fileModel.findByIdAndUpdate(input.fileId, {
          status: 'error',
        });
      }
    }
  }
}
