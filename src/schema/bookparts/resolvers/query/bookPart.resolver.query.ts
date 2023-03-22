import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidUser_type } from 'src/auth/enum/rol.valido';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { User } from 'src/schema/users/entities/user.entity';
import { BookpartsService } from '../../bookparts.service';
import { AddBookPart } from '../../dto/input';
import { EditBookPart } from '../../dto/input/editBookPart';
import { Bookpart } from '../../entities/bookpart.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Bookpart)
export class BookpartsQueryResolver {
  constructor(private readonly bookpartsService: BookpartsService) {}

   @Query(() => Bookpart, { name: 'bookpart' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    console.log('hola')
    // return this.bookpartsService.findOne(id);
  }

 
     //Todo Borrar capitulo o desactivarlo

  // @Query(() => [Bookpart], { name: 'bookparts' })
  // findAll() {
  //   return this.bookpartsService.findAll();
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
