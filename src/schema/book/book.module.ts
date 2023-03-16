import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { CategoryModule } from '../category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';

@Module({
  providers: [BookResolver, BookService,BookService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema 
      }
    ]),
    CategoryModule],
})
export class BookModule {}
