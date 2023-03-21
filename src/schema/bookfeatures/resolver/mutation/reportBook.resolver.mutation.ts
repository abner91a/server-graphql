import { ReportBook } from './../../entities/reportBook.entity';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookfeaturesService } from '../../bookfeatures.service';
import { User } from 'src/schema/users/entities/user.entity';
import { ValidUser_type } from 'src/auth/enum/rol.valido';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UseGuards } from '@nestjs/common';
import { ReportBookInput, UpdateReportBookInput } from '../../dto/input';

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
    @CurrentUser(ValidUser_type.admin) user: User,
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
    @CurrentUser(ValidUser_type.user) user: User,
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
