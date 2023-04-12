import { Module } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { UserBookResolver } from './user-book.resolver';
import { UsersModule } from 'src/schema/users/users.module';
import { BookModule } from 'src/schema/book/book.module';

@Module({
  providers: [UserBookService],
  imports: [
    UsersModule,
    BookModule
  ],
})
export class UserBookModule {}
