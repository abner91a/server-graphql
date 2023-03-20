import { QueryArgsBook } from './dto/args/queryOnebook.book.args';
import { BookListResponse } from './types/bookCategoryResponse.types';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidUser_type } from 'src/auth/enum/rol.valido';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { User } from '../users/entities/user.entity';
import { BookService } from './book.service';
import { QueryArgs } from './dto/args';

import { CreateBookInput, UpdateBookInput } from './dto/input';
import { Book } from './entities/book.entity';
import { BookList } from './entities/Booklist.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  //Publicar libro Usuario
  @Mutation(() => Book, {
    name: 'addBook',
    description: 'Permite al usuario agregar un libro',
  })
  createBook(
    @CurrentUser(ValidUser_type.user) user: User,
    @Args('addBookUser') createBookInput: CreateBookInput,
  ) {
    return this.bookService.publishBook(createBookInput, user);
  }

  //ACTUALIZAR LIBRO USUARIO
  @Mutation(() => Book, {
    name: 'updateBookUser',
    description:
      'Permite al usuario actualizar su libro, esta validado que solo el autor quien creo el libro pueda actualizarlo',
  })
  updateBookUser(
    @CurrentUser(ValidUser_type.user) user: User,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ) {
    //Todo Validar que el titulo no exista en la BD
    return this.bookService.update(updateBookInput, user);
  }

    //TODO: revisar que se pueda hacer query sin categoria ID
  @Query(() => BookListResponse, {
    name: 'getAllBook',
    description: 'Obtiene la lista de libros con query solo para usuarios',
  })
  findAll(
    @Args('query') query: QueryArgs, 
    @CurrentUser(ValidUser_type.user) user: User,
  
  ) {
    return this.bookService.findAllBookQuery(query);
  }

  //TODO: revisar que se pueda hacer query sin categoria ID
  @Query(() => [Book], { name: 'getBookId',description: 'Trae un libro por id' })
 async getBookId(@Args('query') query: QueryArgsBook  ) {
    return this.bookService.getBookDetail(query)
  }




  //TODO
  //Crear la opcion de subir imagen por la api crearla
  //TODO CREAR RUTA PARA QUE EL USUARIO VEA SU LIBRO


  //TODO FUERTES
  //Guardar libro en la biblioteca
  //Perm,itir reportar libro

  // @Query(() => [Book], { name: 'book' })
  // findAll() {
  //   return this.bookService.findAll();
  // }

  // @Query(() => Book, { name: 'book' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.bookService.findOne(id);
  // }

  // @Mutation(() => Book)
  // removeBook(@Args('id', { type: () => Int }) id: number) {
  //   return this.bookService.remove(id);
  // }
}
