/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from 'rxjs';
import { File } from './schemas/files.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FilesService {
  private s3: S3Client;
  private logger = new Logger(FilesService.name);
  private userStreams: Record<string, Subject<any>> = {};
  constructor(
    @InjectModel(File.name)
    private fileModel: Model<File>,
  ) {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
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

  async getFileByEmail(userEmail: string) {
    return this.fileModel.findOne({ userEmail }).sort({ createdAt: -1 }).lean();
  }
}
