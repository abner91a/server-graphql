import { QueryArgsBook } from './dto/args/queryOnebook.book.args';
import { createReadStream } from 'fs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, isValidObjectId } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { User } from '../users/entities/user.entity';
import {
  CreateBookInput,
  CreateBookInputAdmin,
  UpdateBookUserInput,
  UpdateBookAdminInput,
} from './dto/input';
import { Book } from './entities/book.entity';
import { BookFilterException } from 'src/common/filters/book.filter';
import { QueryArgs } from './dto/args/query.book.args';
import { BookListResponse } from './types/bookCategoryResponse.types';

@Injectable()
export class BookService {
  constructor(
    private readonly categoryService: CategoryService,
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
  ) {}

  //ADMIN

  async publishBookAdmin(
    createBookInput: CreateBookInputAdmin,
    user: User,
  ): Promise<Book> {
    const { title, description, isPublished, categories } = createBookInput;

    const existBook = await this.bookModel.findOne({ title });
    if (existBook) BookFilterException.prototype.handlerDBError(null, 4);

    if (categories !== undefined) {
      await this.verificarCategoria(categories);
      for (let i = 0; i < categories.length; i++) {
        const categoryId = await this.categoryService.categoryMultipleId(
          categories[i],
        );
      }
    }

    const book = await this.bookModel.create({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      isPublished,
      categories,
      authorId: user._id,
      authorname: user.fullname,
      isCompleted: false,
    });

    return book;
  }

  async updateBookAdmin(updateBookInput: UpdateBookAdminInput, user: User) {
    const { id, categories, title, description, isCompleted, isActive } =
      updateBookInput;

    const rol = user.roles.some((rol) => rol === 'admin');
    if (!rol) BookFilterException.prototype.handlerDBError(null, 3);

    const book = await this.findByIdBook(id);

    if (categories !== undefined) {
      await this.verificarCategoria(categories);
      for (let i = 0; i < categories.length; i++) {
        const hola = await this.categoryService.categoryMultipleId(
          categories[i],
        );
      }
    }

    if (title !== undefined) book.title = title;
    if (description !== undefined) book.description = description;
    if (isCompleted !== undefined) book.isCompleted = isCompleted;
    if (isActive !== undefined) book.isActive = isActive;
    if (categories !== undefined) book.categories = categories;
    book.updatedAt = new Date();
    await book.save();

    return book;
  }

  ////////////USUARIO
  async publishBookByUser(createBookInput: CreateBookInput, user: User) {
    const existBook = await this.bookModel.findOne({
      title: createBookInput.title,
    });
    if (existBook) BookFilterException.prototype.handlerDBError(null, 4);

    await this.verificarCategoria(createBookInput.categories);

    for (let i = 0; i < createBookInput.categories.length; i++) {
      const categoryId = await this.categoryService.categoryMultipleId(
        createBookInput.categories[i],
      );
    }

    const categoriaCreada = await this.bookModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...createBookInput,
      authorId: user._id,
      authorName: user.fullname,
      isPublished: createBookInput.isPublished,
    });
    return categoriaCreada;
  }

  async updateBookByUser(updateBookInput: UpdateBookUserInput, user: User) {
    const { id, categories, title, description, isCompleted } = updateBookInput;

    const book = await this.findByIdBook(id);

    if (book.authorId.toString() !== user._id.toString())
      BookFilterException.prototype.handlerDBError(null, 3);

    if (categories !== undefined) {
      await this.verificarCategoria(categories);

      for (let i = 0; i < categories.length; i++) {
        const hola = await this.categoryService.categoryMultipleId(
          categories[i],
        );
      }
    }
    if (title) {
      const existeTitulo = await this.bookModel.findOne({
        title: updateBookInput.title,
      });
      if (existeTitulo) BookFilterException.prototype.handlerDBError(null, 4);
    }

    if (categories) book.categories = categories;
    if (title) book.title = title;
    if (description) book.description = description;
    //TODO: Revisar que el admin pueda aprobar esto
    if (isCompleted !== undefined) book.isCompleted = isCompleted;
    book.updatedAt = new Date();
    await book.save();

    return book;
  }

  async findByIdBook(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);

    if (!book) BookFilterException.prototype.handlerDBError(null, 1);

    return book;
  }

  async findByIdBookWithProyection(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id, { _id: 1 });

    if (!book) BookFilterException.prototype.handlerDBError(null, 1);

    return book;
  }

  async findAllBookQuery(query: QueryArgs): Promise<BookListResponse> {
    const { page, perPage, categoryId, sort } = query;

    let queryBook = {
      'categories._id': { $in: [new mongoose.Types.ObjectId(categoryId)] },
      // isApproved: true,
      isActive: false,
    };

    // Todo agregar isCompleted

    let sortData = {};

    if (sort === 'views') {
      sortData = { views: -1 };
    } else if (sort === 'avgRating') {
      sortData = { avgRating: -1 };
    } else if (sort === 'createdAt') {
      sortData = { createdAt: -1 };
    }

    const contador = await this.bookModel.countDocuments(queryBook);

    // console.log(sortData);
    const book = await this.bookModel.aggregate([
      { $match: queryBook },
      { $sort: sortData },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
      { $project: this.aggregateProject() },
    ]);



    const totalPagina = Math.ceil(contador / perPage) || 1;

    return {
      book,
      totalPagina,
    };
  }

  async getBookDetail(query: QueryArgsBook) {
    // const book = await this.findByIdBook(query.idNovel);
    // console.log(book)

    let queryBook = { _id: new mongoose.Types.ObjectId(query.bookId) };

    //Traer los capitulos de los libros

    const book = await this.bookModel.aggregate([
      { $match: queryBook },
      // { $sort: sortData },
      // { $skip: (page - 1) * perPage },
      // { $limit: perPage },
      { $project: this.aggregateProject() },
    ]);

    // console.log(book)

    if (!book.length) BookFilterException.prototype.handlerDBError(null, 1);
    // console.log(book);

    return book;
  }

  //TODO ME GUSTA EL LIBRO
  //CREAR REPORTAR LIBRO

  //Utilidades
  private async verificarCategoria(categoria) {
    const unique = [];
    let item: any;
    for (item of categoria) {
      if (!isValidObjectId(item._id)) {
        throw new BadRequestException(
          `${item._id} de la categoria no es valida  `,
        );
      }
      if (!item.name)
        throw new BadRequestException(
          `El nombre de la categoria no puede estar vacio`,
        );
      const isDuplicate = unique.find((obj) => obj._id === item._id);
      if (!isDuplicate) {
        unique.push(item);
      } else {
        throw new BadRequestException(`Categoria duplicada`);
      }
    }
  }

  async findByIdUpdateBookPortada(id: string, file): Promise<Book> {
    // console.log(file)
    return await this.bookModel.findByIdAndUpdate(id, {
      image: `book/${file.filename}`,
      // imageCDN: `book/${file.filename}`,
      updatedAt: new Date(),
    });
  }

  private aggregateProject() {
    return {
      _id: 1,
      authorId: 1,
      title: 1,
      description: 1,
      image: 1,
      // imageCDN: {
      //   $concat: [process.env.CDN_LIBRO_IMG, '$image'],
      // },
      imageCDN: 1,
      categories: 1,
      isApproved: 1,
      isBlocked: 1,
      avgRating: 1,
      ratingCounts: 1,
      reviewCounts: 1,
      commentCounts: 1,
      totalComments: 1,
      total_chapters: 1,
      views: 1,
      authorName: 1,
      isCompleted: 1,
      booksCount: 1,
      isActive: 1,
      createdAt: 1,
      updatedAt: 1,
      isPublished: 1,
    };
  }
}
