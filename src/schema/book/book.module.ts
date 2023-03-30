import { forwardRef, Module } from '@nestjs/common';
import { BookService } from './book.service';

import { CategoryModule } from '../category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';
import {
  BookResolverAdminMutation,
  BookResolverAdminQuery,
  BookResolverUserMutation,
  BookResolverUserQuery,
} from './book.resolver';
import { UsersModule } from '../users/users.module';
import { BookpartsModule } from '../bookparts/bookparts.module';



@Module({
  providers: [
    BookResolverUserMutation,
    BookResolverAdminMutation,
    BookResolverUserQuery,
    BookResolverAdminQuery,
    BookService,
  ],
  exports: [BookService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
    // forwardRef(() => BookpartsModule),
    BookpartsModule,
    CategoryModule,
    UsersModule,
   ],

})
export class BookModule {}
