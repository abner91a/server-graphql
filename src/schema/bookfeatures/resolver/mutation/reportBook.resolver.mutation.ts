import { ReportBook } from './../../entities/reportBook.entity';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookfeaturesService } from '../../bookfeatures.service';
import { User } from 'src/schema/users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UseGuards } from '@nestjs/common';
import { ReportBookInput, UpdateReportBookInput } from '../../dto/input';
import { ValidRoles } from 'src/auth/enum/rol.valido';

@UseGuards(JwtAuthGuard)
@Resolver(() => ReportBook)
export class ReportBookMutation {
  constructor(private readonly bookfeaturesService: BookfeaturesService) {}

  //R0L == ADMIN
  @Mutation(() => [ReportBook], {
    name: 'updateReportBook',
    description: 'Crear reporte de algun libro rol: Usuario y admin',
  })
  updateBookfeature(
    @Args('addReportBook') updateReport: UpdateReportBookInput,
    @CurrentUser([(ValidRoles.admin)]) user: User,
  ) {
    return this.bookfeaturesService.updateReportBook(updateReport, user);
    // console.log('asdas')
  }

  //ROL == Usuario
  @Mutation(() => ReportBook, {
    name: 'addReportBook',
    description: 'Crear reporte de algun libro rol: Usuario y admin',
  })
  createBookfeature(
    @Args('addReportBook') addReportBook: ReportBookInput,
    @CurrentUser([(ValidRoles.admin, ValidRoles.user, ValidRoles.editor)]) user: User,
  ) {
    // console.log(addReportBook);
    return this.bookfeaturesService.addCreateReportBook(addReportBook, user);
  }

  //   @Query(() => [Bookfeature], { name: 'bookfeatures' })
  //   findAll() {
  //     return this.bookfeaturesService.findAll();
  //   }

  //   @Query(() => Bookfeature, { name: 'bookfeature' })
  //   findOne(@Args('id', { type: () => Int }) id: number) {
  //     return this.bookfeaturesService.findOne(id);
  //   }

  //   @Mutation(() => Bookfeature)
  //   updateBookfeature(@Args('updateBookfeatureInput') updateBookfeatureInput: UpdateBookfeatureInput) {
  //     return this.bookfeaturesService.update(updateBookfeatureInput.id, updateBookfeatureInput);
  //   }

  //   @Mutation(() => Bookfeature)
  //   removeBookfeature(@Args('id', { type: () => Int }) id: number) {
  //     return this.bookfeaturesService.remove(id);
  //   }
}
