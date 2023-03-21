import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookpartsService } from './bookparts.service';
import { Bookpart } from './entities/bookpart.entity';
import { CreateBookpartInput } from './dto/create-bookpart.input';
import { UpdateBookpartInput } from './dto/update-bookpart.input';
import { AddBookPart } from './dto/input';

@Resolver(() => Bookpart)
export class BookpartsResolver {
  constructor(private readonly bookpartsService: BookpartsService) {}

  @Mutation(() => Bookpart, { name: 'addBookPart', description:"Agrega una parte al libro"})
  createBookpart(@Args('addBookPart') addBookPart: AddBookPart) {
    return this.bookpartsService.create(addBookPart);
  }

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
