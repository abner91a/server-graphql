import { CategoryService } from './../../category.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Category } from '../../entities/category.entity';
import { CreateCategoryInput } from '../../dto/create-category.input';
import { User } from 'src/schema/users/entities/user.entity';
import { ValidRoles } from 'src/auth/enum/rol.valido';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { UpdateCategoryInput } from '../../dto/update-category.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Resolver(() => Category)
export class CategoryResolverMutationAdmin {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category, {
    name: 'addCategoryAdmin',
    description: 'Permite al adm agregar categoria',
  })
  async addCategory(
    @Args('addCategory') addCategory: CreateCategoryInput,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<Category> {
    return await this.categoryService.createCategory(addCategory);
  }

  
  @Mutation(() => Category, {
    name: 'updateCategoryAdmin',
    description: 'Permite al adm actualizar la categoria',
  })
  async updateCategory(
    @Args('updateCategory') updateCategoryInput: UpdateCategoryInput,
    @CurrentUser([(ValidRoles.admin)]) user: User,
  ): Promise<Category> {
    return await this.categoryService.updateCategoryAdmin(updateCategoryInput);
  }
}
