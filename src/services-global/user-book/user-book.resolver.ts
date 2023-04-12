import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserBookService } from './user-book.service';
import { UserBook } from './entities/user-book.entity';
import { CreateUserBookInput } from './dto/create-user-book.input';
import { UpdateUserBookInput } from './dto/update-user-book.input';

@Resolver(() => UserBook)
export class UserBookResolver {
  constructor(private readonly userBookService: UserBookService) {}
}
