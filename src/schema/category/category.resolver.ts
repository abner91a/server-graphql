import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipes';
import { ValidRoles } from 'src/auth/enum/rol.valido';

@UseGuards(JwtAuthGuard)
@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  //////ADMIN
  @Mutation(() => Category, {
    name: 'addCategory',
    description: 'Permite al adm agregar categoria',
  })
  async addCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @CurrentUser([(ValidRoles.admin)]) user: User,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryInput);
  }

  @Mutation(() => Category, {
    name: 'updateCategory',
    description: 'Permite al adm actualizar la categoria',
  })
  async updateCategory(
    @Args('createCategoryInput') updateCategoryInput: UpdateCategoryInput,
    @CurrentUser([(ValidRoles.admin)]) user: User,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(updateCategoryInput);
  }

  //////USER

  @Query(() => [Category], {
    name: 'getAllcategory',
    description: 'Trae todas las categorias',
  })
  async getAllCategory(
    @CurrentUser([(ValidRoles.admin, ValidRoles.user, ValidRoles.editor)]) user: User,
  ): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Query(() => Category, {
    name: 'getIdcategory',
    description: 'Trare una categoria',
  })
  async getIdcategory(
    @Args('id', { type: () => ID }, ParseMongoIdPipe) id: string,
    @CurrentUser([(ValidRoles.admin, ValidRoles.user, ValidRoles.editor)]) user: User,
  ): Promise<Category[]> {
    return await this.categoryService.findByCategoryId(id);
  }


}
