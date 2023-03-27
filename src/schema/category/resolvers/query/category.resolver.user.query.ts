import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipes';
import { ValidRoles } from 'src/auth/enum/rol.valido';
import { Category } from '../../entities/category.entity';
import { CategoryService } from '../../category.service';
import { User } from 'src/schema/users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Category)
export class CategoryResolverUserQuery {
  constructor(private readonly categoryService: CategoryService) {}

  //////USER

  @Query(() => [Category], {
    name: 'getAllcategory',
    description: 'Trae todas las categorias',
  })
  async getAllCategory(
    @CurrentUser([(ValidRoles.user)]) user: User,
  ): Promise<Category[]> {

    return await this.categoryService.findAll();
  }

  @Query(() => Category, {
    name: 'getIdcategory',
    description: 'Trare una categoria',
  })
  async getIdcategory(
    @Args('id', { type: () => ID }, ParseMongoIdPipe) id: string,
    @CurrentUser([(ValidRoles.admin, ValidRoles.user)]) user: User,
  ): Promise<Category[]> {
    return await this.categoryService.findByCategoryId(id);
  }


}
