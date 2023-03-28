import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { User } from 'src/schema/users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/file-filter.helpers';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helpers';
import { CategoryidGuard } from 'src/schema/category/guards/catergory-id.guard';
import { BookidGuard } from 'src/schema/book/guards/book-id.book';
import { ValidRoles } from 'src/auth/enum/rol.valido';

@Controller('v1/upload/files')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('category/:id')
  @UseGuards(JwtAuthGuard, CategoryidGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
       limits: { fileSize: 2097152 }, //En bytes https://convertlive.com/es/u/convertir/megabytes/a/bytes#2
      storage: diskStorage({
        destination: './public/images/category',
        filename: fileNamer,
      }),
    }),
  )
  async create(
    @Param('id', ParseMongoIdPipe) id: string,
    @CurrentUser([(ValidRoles.admin)]) user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.uploadService.uploadFileCategory(id, file);
  }


  //Multer upload file
  


  @Post('book/:id')
  @UseGuards(JwtAuthGuard, BookidGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
       limits: { fileSize: 2097152 }, //En bytes https://convertlive.com/es/u/convertir/megabytes/a/bytes#2
      storage: diskStorage({
        destination: './public/images/book',
        filename: fileNamer,
      }),
    }),
  )
  async uploadFile(
    @Param('id', ParseMongoIdPipe) id: string,
    @CurrentUser([(ValidRoles.admin, ValidRoles.user, ValidRoles.editor)]) user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.uploadService.uploadFileBook(id, file);
  }
}
