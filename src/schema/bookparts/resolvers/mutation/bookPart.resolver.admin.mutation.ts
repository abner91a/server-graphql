import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidRoles } from 'src/auth/enum/rol.valido';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { User } from 'src/schema/users/entities/user.entity';
import { BookpartsService } from '../../bookparts.service';
import { AddBookPart, EditBookPartAdmin } from '../../dto/input';
import { AddBookPartAdmin } from '../../dto/input/adBookPartAdmin';
import { Bookpart } from '../../entities/bookpart.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Bookpart)
export class BookpartsMutationAdminResolver {
  constructor(private readonly bookpartsService: BookpartsService) {}

  @Mutation(() => Bookpart, {
    name: 'addBookPartAdmin',
    description: 'Agrega un capitulo al libro',
  })
 async createBookpartAdmin(
    @Args('addBookPartAdmin') addBookPartAdmin: AddBookPartAdmin,
    @CurrentUser([( ValidRoles.editor,ValidRoles.admin)]) user: User):Promise<Bookpart>  {
    return this.bookpartsService.addPartBookAdmin(addBookPartAdmin,user);
  }

  @Mutation(() => Bookpart, { name: 'editBookPartAdmin' })
    async editBookPartAdmin( @Args('editBookPart') editBookPart: EditBookPartAdmin,
    @CurrentUser([( ValidRoles.editor,ValidRoles.admin)]) user: User,
    ) {
    return this.bookpartsService.updateChapterAdmin(editBookPart,user);
    }


//   @Mutation(() => Bookpart, {
//     name: 'editBookPart',
//     description: 'edita un capitulo de algun libro',
//   })
//  async editBookPartAdmin(
//     @Args('editBookPart') editBookPart: EditBookPart,
//     @CurrentUser([(ValidRoles.admin, ValidRoles.user, ValidRoles.editor)]) user: User,
//   ) {
//     return this.bookpartsService.updateChapter(editBookPart,user);

//   }

  //Todo Borrar capitulo o desactivarlo

}
