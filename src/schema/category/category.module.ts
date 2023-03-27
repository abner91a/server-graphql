import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { CategoryResolverMutationAdmin, CategoryResolverUserQuery } from './category.resolver';



@Module({
  providers: [CategoryResolverMutationAdmin,CategoryResolverUserQuery , CategoryService],
  exports: [CategoryService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      }
    ])
  ]
})
export class CategoryModule {}
