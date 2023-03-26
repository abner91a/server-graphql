import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidRoles } from 'src/auth/enum/rol.valido';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { User } from 'src/schema/users/entities/user.entity';
import { BookpartsService } from '../../bookparts.service';
import { AddBookPart } from '../../dto/input';
import { EditBookPart } from '../../dto/input/editBookPart';
import { Bookpart } from '../../entities/bookpart.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Bookpart)
export class BookpartsMutationResolver {
  constructor(private readonly bookpartsService: BookpartsService) {}

  @Mutation(() => Bookpart, {
    name: 'addBookPart',
    description: 'Agrega un capitulo al libro',
  })
  createBookpart(
    @Args('addBookPart') addBookPart: AddBookPart,
    @CurrentUser([(ValidRoles.admin, ValidRoles.user, ValidRoles.editor)]) user: User,) {
    return this.bookpartsService.addPartBook(addBookPart,user);
  }

  @Mutation(() => Bookpart, {
    name: 'editBookPart',
    description: 'edita un capitulo de algun libro',
  })
  editBookPart(
    @Args('editBookPart') editBookPart: EditBookPart,
    @CurrentUser([(ValidRoles.admin, ValidRoles.user, ValidRoles.editor)]) user: User,
  ) {
    return this.bookpartsService.updateChapter(editBookPart,user);

  }

  //Todo Borrar capitulo o desactivarlo

  // @Query(() => [Bookpart], { name: 'bookparts' })
  // findAll() {
  //   return this.bookpartsService.findAll();
  // }

  // @Query(() => Bookpart, { name: 'bookpart' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.bookpartsService.findOne(id);
  // }

  // @Mutation(() => Bookpart)
  // updateBookpart(@Args('updateBookpartInput') updateBookpartInput: UpdateBookpartInput) {
  //   return this.bookpartsService.update(updateBookpartInput.id, updateBookpartInput);
  // }

  // @Mutation(() => Bookpart)
  // removeBookpart(@Args('id', { type: () => Int }) id: number) {
  //   return this.bookpartsService.remove(id);
  // }
}
