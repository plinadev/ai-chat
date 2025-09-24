import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
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
  @Post('start-processing')
  async startProcessing(@Body() body: { fileId: string; userEmail: string }) {
    return this.filesService.startProcessing(body.fileId, body.userEmail);
  }

  @Get()
  async getFile(@Query('userEmail') userEmail: string) {
    return this.filesService.getFileByEmail(userEmail);
  }
  @Delete()
  async deleteFile(
    @Query('fileId') fileId: string,
    @Query('userEmail') userEmail: string,
  ) {
    return this.filesService.deleteFile(fileId, userEmail);
  }
  @Get('/status')
  async getFileStatus(@Query('userEmail') userEmail: string) {
    return this.filesService.getFileStatusByEmail(userEmail);
  }
}
