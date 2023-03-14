import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@UseGuards(JwtAuthGuard)
@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}


  async createCategory(createCategoryInput: CreateCategoryInput):Promise<Category> {
    const categoria = await this.categoryModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...createCategoryInput,
    });
    return categoria;
  
  }

  async findAll():Promise<Category[]> {
    
    const categoria = await this.categoryModel.find()

    return categoria;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // update(id: number, updateCategoryInput: UpdateCategoryInput) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}
