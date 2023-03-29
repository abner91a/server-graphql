import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidRoles } from 'src/auth/enum/rol.valido';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { User } from 'src/schema/users/entities/user.entity';
import { BookpartsService } from '../../bookparts.service';
import { AddBookPart } from '../../dto/input';
import { EditBookPartUser } from '../../dto/input/editBookPart';
import { Bookpart } from '../../entities/bookpart.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Bookpart)
export class BookpartsMutationUserResolver {
  constructor(private readonly bookpartsService: BookpartsService) {}

  @Mutation(() => Bookpart, {
    name: 'addBookPartUser',
    description: 'Usuario: Agrega un capitulo al libro',
  })
  createBookpart(
    @Args('addBookPartUser') addBookPartUser: AddBookPart,
    @CurrentUser([(ValidRoles.admin, ValidRoles.user)]) user: User,) {
    return this.bookpartsService.addPartBookUser(addBookPartUser,user);
  }

  @Mutation(() => Bookpart, {
    name: 'editBookPartUser',
    description: 'Usuario: edita un capitulo de algun libro',
  })
  editBookPartUser(
    @Args('editBookPartUser') editBookPartUser: EditBookPartUser,
    @CurrentUser([(ValidRoles.admin, ValidRoles.user)]) user: User,
  ) {
    return this.bookpartsService.updateChapterUser(editBookPartUser,user);

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
