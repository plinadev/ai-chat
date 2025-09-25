import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop({ required: true })
  fileId: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  question: string;

  @Prop()
  answer: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
