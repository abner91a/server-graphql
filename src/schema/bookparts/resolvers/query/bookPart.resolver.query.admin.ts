import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipes';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { User } from 'src/schema/users/entities/user.entity';
import { BookpartsService } from '../../bookparts.service';

import { Bookpart } from '../../entities/bookpart.entity';
import { QueryBookPartArgs } from '../../dto/args/query.bookparts.args';
import { QueryBookAllPartArgs } from '../../dto/args/query.bookAllpart.args';
import { getAllBookListReadResponse, readBookListReadResponse } from '../../types/bookPart.types';

@UseGuards(JwtAuthGuard)
@Resolver(() => Bookpart)
export class BookpartsQueryAdminResolver {
  constructor(private readonly bookpartsService: BookpartsService) {}

    



//   @Query(() => Bookpart, { name: 'getOneBookpart' })
//   findOneBookPartOne(@Args('id', ParseMongoIdPipe) id: string) {
//     return this.bookpartsService.findOneBookPartOne(id);
//   }


//   @Query(() => getAllBookListReadResponse, { name: 'getAllChapter' })
//   getallChapter(
//     @Args('query') query: QueryBookAllPartArgs ):Promise<getAllBookListReadResponse>{
//     return this.bookpartsService.getAllChapter(query);
//   }


//   @Query(() => readBookListReadResponse, { name: 'readBook' })
//   read_book(
//     @Args('read') read: QueryBookPartArgs ):Promise<readBookListReadResponse>{
//     return this.bookpartsService.readNovel(read);
//   }

  //Todo Borrar capitulo o desactivarlo


}
