import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload-url')
  async getUploadUrl(
    @Body() body: { userEmail: string; originalFilename: string },
  ) {
    return this.filesService.generateUploadUrl(
      body.userEmail,
      body.originalFilename,
    );
  }

  @Get()
  async getFile(@Query('userEmail') userEmail: string) {
    return this.filesService.getFileByEmail(userEmail);
  }
  @Get('/status')
  async getFileStatus(@Query('userEmail') userEmail: string) {
    return this.filesService.getFileStatusByEmail(userEmail);
  }
}
