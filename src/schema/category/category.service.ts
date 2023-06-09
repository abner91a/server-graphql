import { CategoryFilterException } from './../../common/filters/category.filter';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { QueryCategoryAdminArgs } from './dto/args/query.category.admin.args';
import { CategoryAdminResponse } from './type/categoryResponse';
import { QueryCategoryUserArgs } from './dto/args/query.category.user.args';
import { CategoryUserResponse } from './type/categoryResponseUser';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  //Crea un nuevo registro de categoria
  async createCategory(addCategory: CreateCategoryInput): Promise<Category> {
    const existeCategory = await this.categoryModel.findOne({
      name: addCategory.name,
    });

    if (existeCategory)
      CategoryFilterException.prototype.handlerDBError(null, 2);

    const categoria = await this.categoryModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...addCategory,
    });
    return categoria;
  }

  async findAll(query: QueryCategoryUserArgs): Promise<CategoryUserResponse> {
    // const categoria = await this.categoryModel.find();
    const { page, perPage } = query;
    const skip = (page - 1) * perPage;
    const limit = perPage;

    const categoria = await this.categoryModel.aggregate([
      { $match: { isActive: true } },
      { $project: this.aggregateProject() },
      { $skip: skip },
      { $limit: limit },
    ]);

    if (categoria.length === 0)
      CategoryFilterException.prototype.handlerDBError(null, 3);

    const countCategory = await this.categoryModel.countDocuments({
      isActive: true,
    });
    const totalPage = Math.ceil(countCategory / perPage);
    return {
      categoria,
      totalPage,
      totalCategoria: countCategory,
    };
  }

  async findCategoryById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);

    if (!category) CategoryFilterException.prototype.handlerDBError(null, 1);

    return category;
  }

  async categoryMultipleId(query) {

    const catergory = await this.categoryModel.find(query);

    if (!catergory.length)
      CategoryFilterException.prototype.handlerDBError(null, 1);

    return catergory;
  }

  async updateCategoryAdmin(
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    const existeCategory = await this.categoryModel.findOne({
      name: updateCategoryInput.name,
    });

    if (existeCategory)
      CategoryFilterException.prototype.handlerDBError(null, 2);

    const category = await this.findCategoryById(updateCategoryInput.id);

    if (updateCategoryInput.name) {
      category.name = updateCategoryInput.name;
    }

    if (updateCategoryInput.isActive !== undefined) {
      category.isActive = updateCategoryInput.isActive;
    }

    category.updatedAt = new Date();

    if (updateCategoryInput.image !== undefined) {
      category.image = updateCategoryInput.image;
    }
    //Todo cache: Guardar en el cache
    await category.save();

    return category;
  }

  async findByCategoryId(id): Promise<Category[]> {
    // const categoria = await this.categoryModel.find();
    // console.log(id);
    const categoria = await this.categoryModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $project: this.aggregateProject() },
    ]);

    if (categoria.length === 0)
      CategoryFilterException.prototype.handlerDBError(null, 1);

    return categoria[0];
  }

  async findByIdUpdate(id: string, file): Promise<Category> {
    // console.log(file)
    return await this.categoryModel.findByIdAndUpdate(id, {
      image: `category/${file.filename}`,
      imageCDN: `${process.env.CDN_CATEGORIA_IMG}category/${file.filename}`,
      updatedAt: new Date(),
    });
  }

  async findAllCategoryAdmin(
    query: QueryCategoryAdminArgs,
  ): Promise<CategoryAdminResponse> {
    const { page, perPage, isActive } = query;

    let total = 0;
    let totalCategory = 0;
    let categoria = [];

    if (isActive !== undefined) {
      categoria = await this.categoryModel.aggregate(
        this.aggregateCategoryAdmin(page, perPage, isActive),
      );
      total = await this.categoryModel.countDocuments({
        isActive: isActive,
      });
      totalCategory = Math.ceil(total / perPage);
    } else {
      categoria = await this.categoryModel.aggregate(
        this.aggregateCategoryAdminAll(page, perPage),
      );
      total = await this.categoryModel.countDocuments();
      totalCategory = Math.ceil(total / perPage);
    }

    return {
      categoria,
      totalCategory,
    };
  }

  private aggregateCategoryAdmin(
    page: number,
    perPage: number,
    isActive: boolean,
  ) {
    return [
      { $match: { isActive: isActive } },
      { $project: this.aggregateProject() },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
    ];
  }

  private aggregateCategoryAdminAll(page: number, perPage: number) {
    return [
      { $project: this.aggregateProject() },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
    ];
  }

  private aggregateProject() {
    return {
      _id: 1,
      name: 1,
      image: 1,
      // imageCDN: {
      //   $concat: [process.env.CDN_CATEGORIA_IMG, '$image'],
      // },
      imageCDN: 1,
      // isCompleted: 1,
      booksCount: 1,
      isActive: 1,
      createdAt: 1,
      updatedAt: 1,
    };
  }
}
