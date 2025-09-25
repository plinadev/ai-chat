import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('ask')
  async ask(
    @Body() body: { fileId: string; userEmail: string; question: string },
  ) {
    return this.chatService.askQuestion(
      body.fileId,
      body.userEmail,
      body.question,
    );
  }
  @Get('history')
  async getHistory(@Query('userEmail') userEmail: string) {
    return this.chatService.getChatHistory(userEmail);
  }
}
