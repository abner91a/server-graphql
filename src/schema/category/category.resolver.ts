import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category, {
    name: 'addCategory',
    description: 'Permite al adm agregar categoria',
  })
  async addCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ):Promise<Category> {
    return await this.categoryService.createCategory(createCategoryInput);
  }

  @Query(() => [Category], { name: 'getAllcategory',description: 'Trae todas las categorias' })
  async getAllCategory():Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  // @Query(() => Category, { name: 'category' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.categoryService.findOne(id);
  // }

  // @Mutation(() => Category)
  // updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
  //   return this.categoryService.update(updateCategoryInput.id, updateCategoryInput);
  // }

  // @Mutation(() => Category)
  // removeCategory(@Args('id', { type: () => Int }) id: number) {
  //   return this.categoryService.remove(id);
  // }
}
