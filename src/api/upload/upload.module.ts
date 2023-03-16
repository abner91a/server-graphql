import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CategoryModule } from 'src/schema/category/category.module';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [CategoryModule]
})
export class UploadModule {}
