import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema({ timestamps: true })
export class File {
  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  userFilename: string;

  @Prop({ required: true, unique: true })
  s3Filename: string;

  @Prop({ default: 'pending', enum: ['pending', 'success', 'error'] })
  status: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
