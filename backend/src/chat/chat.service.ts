import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import { Chat } from './schemas/chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  private pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async askQuestion(fileId: string, userEmail: string, question: string) {
    //1. Embed the question
    const embeddingRes = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: question,
    });

    const questionVector = embeddingRes.data[0].embedding;

    //2. Query Pinecone
    const index = this.pinecone.index('ai-chat-index');
    const queryRes = await index.query({
      vector: questionVector,
      topK: 5,
      includeMetadata: true,
      filter: { fileId },
    });

    const matches = queryRes.matches ?? [];
    const contextTexts = matches
      .map((m) => m.metadata?.chunk_text)
      .join('\n\n');

    //3. Call AI
    const prompt = `You are a helpful, friendly, and relaxed AI assistant. Answer in a conversational tone, as if explaining to a colleague. Be clear and concise, but not overly formal. If lists or steps make sense, format them nicely.
    Answer the question based only on the following: 
    ${contextTexts}
    Question: ${question}`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    const answer =
      completion.choices[0].message.content ??
      "I couldn't find an answer to your question :(";

    const conversation = new this.chatModel({
      fileId,
      userEmail,
      question,
      answer,
    });
    await conversation.save();

    return { fileId, userEmail, question, answer };
  }

  async getChatHistory(userEmail: string) {
    return this.chatModel.find({ userEmail }).sort({ createdAt: 1 });
  }
}
