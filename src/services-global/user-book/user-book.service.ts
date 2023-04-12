import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/schema/users/users.service';
import { BookService } from 'src/schema/book/book.service';

@Injectable()
export class UserBookService {
  constructor(
    private readonly  bookService: BookService,
    private readonly userService: UsersService,
  ) {

    async function test() { 
console.log('test');
    }
  }

}
