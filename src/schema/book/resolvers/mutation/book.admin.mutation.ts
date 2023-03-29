
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidRoles } from 'src/auth/enum/rol.valido';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { User } from 'src/schema/users/entities/user.entity';
import { BookService } from '../../book.service';
import { CreateBookInputAdmin, UpdateBookAdminInput } from '../../dto/input';

import { Book } from '../../entities/book.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Book)
export class BookResolverAdminMutation {
  constructor(private readonly bookService: BookService) {}

  //Publicar Libro admin
  @Mutation(() => Book, {
    name: 'addBookAdmin',
    description: 'Permite al admin agregar un libro',
  })
  async createBookAdmin(
    @Args('addBookAdmin') addBookInput: CreateBookInputAdmin,
    @CurrentUser([(ValidRoles.admin)])
    user: User,
  ): Promise<Book> {
    return await this.bookService.publishBookAdmin(addBookInput, user);
  }


  @Mutation(() => Book, {
    name: 'updateBookAdmin',
    description: 'Permite al admin actualizar un libro',
  })
  async updateBookAdmin(
    @Args('updateBookInput') updateBookInput: UpdateBookAdminInput,
    @CurrentUser([(ValidRoles.admin)]) user: User,
  ): Promise<Book> {
    return await this.bookService.updateBookAdmin(updateBookInput, user);
  }
}
