import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidRoles } from 'src/auth/enum/rol.valido';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { User } from 'src/schema/users/entities/user.entity';
import { BookService } from '../../book.service';
import { QueryArgs } from '../../dto/args';
import { QueryArgsBook } from '../../dto/args/queryOnebook.book.args';
import { Book } from '../../entities/book.entity';
import { BookListResponse } from '../../types/bookCategoryResponse.types';

@UseGuards(JwtAuthGuard)
@Resolver(() => Book)
export class BookResolverUserQuery {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book], {
    name: 'getBookInfo',
    description: 'Obtenemos un libro por id',
  })
  async getBookId(
    @Args('query') query: QueryArgsBook,
    @CurrentUser([(ValidRoles.admin, ValidRoles.user)])
    user: User,
  ) {
    return this.bookService.getBookDetail(query);
  }

  @Query(() => BookListResponse, {
    name: 'getAllBook',
    description: 'Obtiene la lista de libros con query solo para usuarios',
  })
  findAll(
    @Args('query') query: QueryArgs,
    @CurrentUser([(ValidRoles.admin, ValidRoles.user)])
    user: User,
  ) {
    return this.bookService.findAllBookQuery(query);
  }
}
