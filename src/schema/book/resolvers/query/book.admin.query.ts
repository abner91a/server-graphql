import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, ResolveProperty, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidRoles } from 'src/auth/enum/rol.valido';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { Bookpart } from 'src/schema/bookparts/entities/bookpart.entity';
import { User } from 'src/schema/users/entities/user.entity';
import { BookService } from '../../book.service';
import { QueryArgs } from '../../dto/args';
import { QueryBookAdminArgs } from '../../dto/args/query.book.admin.args';
import { QueryArgsBook } from '../../dto/args/queryOnebook.book.args';
import { Book } from '../../entities/book.entity';
import { BookListResponse } from '../../types/bookCategoryResponse.types';

@UseGuards(JwtAuthGuard)
@Resolver(() => Book)
export class BookResolverAdminQuery {
  constructor(private readonly bookService: BookService) {}

  //Obtener libros que necesitan ser aprobados
  @Query(() => BookListResponse, {
    name: 'getBookPending',
    description: 'Obtiene los libros pendientes para ser aprobados',
  })
  async getBookListPending(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<BookListResponse> {
    return await this.bookService.getBookPending(paginationArgs);
  }

  //Obtenemos un libro por id
  @Query(() => Book, {
    name: 'getBookByIdAdmin',
    description: 'Obtiene un libro por id',
  })
  async getBookId(
    @Args() queryBookAdminArgs: QueryBookAdminArgs,
    @CurrentUser([ValidRoles.admin]) user: User,
  ) {
    return await this.bookService.getBookDetailAdmin(queryBookAdminArgs);
  }

  // @ResolveProperty(() => User, { name: 'getuserPanel' })
  // async user(@Parent() book: Book) {
  //   return await this.bookService.getuserByBook(book);
  // }


  //Get chapter by bookId
  @ResolveField(() => [Bookpart], { name: 'chapter' })
  async chapters(
    @Parent() book: Book,
    @Args() paginationArgs: PaginationArgs,
    ) {
 
    return await this.bookService.getChapterByBook(book, paginationArgs);
  }
}
