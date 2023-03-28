import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidRoles } from 'src/auth/enum/rol.valido';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { User } from 'src/schema/users/entities/user.entity';
import { BookService } from '../../book.service';
import { CreateBookInput } from '../../dto/input';
import { Book } from '../../entities/book.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Book)
export class BookResolverUserMutation {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book, {
    name: 'addBookUser',
    description: 'Permite al usuario agregar un libro',
  })
  async createBook(
    @CurrentUser([(ValidRoles.admin, ValidRoles.editor, ValidRoles.user)])
    user: User,
    @Args('addBookUser') addBookInput: CreateBookInput,
  ) {
    return await this.bookService.publishBook(addBookInput, user);
  }
}
