import { Module } from '@nestjs/common';
import { BookService } from './book.service';

import { CategoryModule } from '../category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';
import { BookResolverUserMutation } from './book.resolver';

@Module({
  providers: [BookResolverUserMutation, BookService,BookService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema 
      },
      
    ]),
    CategoryModule],
    exports: [BookService]
})
export class BookModule {}
