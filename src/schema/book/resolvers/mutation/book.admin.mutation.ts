import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { BookService } from '../../book.service';
import { Book } from '../../entities/book.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Book)
export class BookResolverAdminMutation {
  constructor(private readonly bookService: BookService) {};

  

}
