import { CategoryFilterException } from './../../common/filters/category.filter';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    const categoria = await this.categoryModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...createCategoryInput,
    });
    return categoria;
  }

  async findAll(): Promise<Category[]> {
    // const categoria = await this.categoryModel.find();

    const categoria = await this.categoryModel.aggregate([
      { $match: { isActive: true } },
      { $project: this.aggregateProject() },
    ]);

    // console.log(categoria);

    return categoria;
  }

  async findCategoryById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);

    if (!category) CategoryFilterException.prototype.handlerDBError(null, 1);

    return category;
  }

  async categoryMultipleId(query) {
    // const category = await this.categoryModel.findById(id);

    // if (!category) CategoryFilterException.prototype.handlerDBError(null, 1);

    // console.log(query)

    const catergory = await this.categoryModel.find(query);

    if (!catergory.length)
      CategoryFilterException.prototype.handlerDBError(null, 1);

    return catergory;
  }

  async updateCategory(
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    const category = await this.findCategoryById(updateCategoryInput.id);

    category.name = updateCategoryInput.name;
    category.updatedAt = new Date();
    category.isActive = updateCategoryInput.isActive;

    if (updateCategoryInput.image !== undefined) {
      category.image = updateCategoryInput.image;
    }
    //Todo cache: Guardar en el cache
    category.save();

    return category;
  }

  async findByCategoryId(id): Promise<Category[]> {
    // const categoria = await this.categoryModel.find();
    // console.log(id);
    const categoria = await this.categoryModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $project: this.aggregateProject() },
    ]);

    // console.log(categoria)

    return categoria[0];
  }

  async findByIdUpdate(id: string, file): Promise<Category> {
    // console.log(file)
    return await this.categoryModel.findByIdAndUpdate(id, {
      image: `category/${file.filename}`,
      updatedAt: new Date(),
    });
  }

  private aggregateProject() {
    return {
      _id: 1,
      name: 1,
      image: 1,
      imageCDN: {
        $concat: [process.env.CDN_CATEGORIA_IMG, '$image'],
      },
      // isCompleted: 1,
      booksCount: 1,
      isActive: 1,
      createdAt: 1,
      updatedAt: 1,
    };
  }
}
