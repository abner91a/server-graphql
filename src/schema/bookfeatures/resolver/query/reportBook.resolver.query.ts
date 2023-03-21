import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidUser_type } from 'src/auth/enum/rol.valido';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { User } from 'src/schema/users/entities/user.entity';
import { BookfeaturesService } from '../../bookfeatures.service';
import { QueryReportArgs } from '../../dto/args/query.report.args';
import { Bookfeature } from '../../entities/bookfeature.entity';
import { ReportBook } from '../../entities/reportBook.entity';
import { ReportListResponse } from '../../types/reportBook.type';

@UseGuards(JwtAuthGuard)
@Resolver(() => Bookfeature)
export class BookQueryResolver {
  constructor(private readonly bookfeaturesService: BookfeaturesService) {}

  @Query(() => ReportListResponse, {
    name: 'reportBookAll',
    description: 'Lista de Todo los reporte por query',
  })
  async findAll(
    @Args('query') query: QueryReportArgs,
    @CurrentUser(ValidUser_type.admin) user: User,
  ): Promise<ReportListResponse> {
    return this.bookfeaturesService.findAllReport(query, user);
  }

  //   @Query(() => Bookfeature, { name: 'bookfeature' })
  //   findOne(@Args('id', { type: () => Int }) id: number) {
  //     return this.bookfeaturesService.findOne(id);
  //   }
}
