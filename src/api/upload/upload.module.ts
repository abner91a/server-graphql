import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CategoryModule } from 'src/schema/category/category.module';
import { BookModule } from 'src/schema/book/book.module';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [CategoryModule, BookModule],
})
export class UploadModule {}
