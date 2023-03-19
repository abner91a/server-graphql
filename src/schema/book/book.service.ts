import { QueryArgsBook } from './dto/args/queryOnebook.book.args';
import { createReadStream } from 'fs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, isValidObjectId } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { User } from '../users/entities/user.entity';
import { CreateBookInput, UpdateBookInput } from './dto/input';
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

  async publishBook(createBookInput: CreateBookInput, user: User) {
    const getCategoryId = createBookInput.categories.forEach(
      (category: any) => {
        if (!isValidObjectId(category._id)) {
          throw new BadRequestException(
            `${category._id} de la categoria no es valida  `,
          );
        }
        // category._id = new mongoose.Types.ObjectId( category._id )
      },
    );

    for (let i = 0; i < createBookInput.categories.length; i++) {
      const hola = await this.categoryService.categoryMultipleId(
        createBookInput.categories[i],
      );
    }

    const categoriaCreada = await this.bookModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...createBookInput,
      authorId: user._id,
      authorName: user.fullname,
    });
    return categoriaCreada;
  }

  async update(updateBookInput: UpdateBookInput, user: User) {
    const getCategoryId = updateBookInput.categories.forEach(
      (category: any) => {
        if (!isValidObjectId(category._id)) {
          throw new BadRequestException(
            `${category._id} de la categoria no es valida  `,
          );
        }
      },
    );

    for (let i = 0; i < updateBookInput.categories.length; i++) {
      const hola = await this.categoryService.categoryMultipleId(
        updateBookInput.categories[i],
      );
    }

    if (updateBookInput.title) {
      const existeTitulo = await this.bookModel.findOne({
        title: updateBookInput.title,
      });
      if (existeTitulo) BookFilterException.prototype.handlerDBError(null, 4);
    }

    const book = await this.findByIdBook(updateBookInput.id);

    //Revisar
    if (book.authorId.toString() !== user._id.toString())
      BookFilterException.prototype.handlerDBError(null, 3);

    if (updateBookInput.bloquearLibro) {
      if (user.user_type === 2) {
        this.actualizarAdm(book, updateBookInput);
        // console.log(book)
      } else {
        BookFilterException.prototype.handlerDBError(null, 3);
      }
    }

    if (updateBookInput.description)
      book.description = updateBookInput.description;
    if (updateBookInput.categories)
      book.categories = updateBookInput.categories;
    if (updateBookInput.title) book.title = updateBookInput.title;

    if (updateBookInput.publicar) {
      if (updateBookInput.publicar === 'si') book.isPublished = true;
      if (updateBookInput.publicar === 'no') book.isPublished = false;
    }
    if (updateBookInput.completado) {
      if (updateBookInput.completado === 'si') book.isPublished = true;
      if (updateBookInput.completado === 'no') book.isPublished = false;
    }

    book.updatedAt = new Date();

    if (!book) BookFilterException.prototype.handlerDBError(null, 2);

    // console.log(book);

    book.save();

    // console.log(book)

    return book;
  }

  async findByIdBook(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);

    if (!book) BookFilterException.prototype.handlerDBError(null, 1);

    return book;
  }

  async findAllQuery(query: QueryArgs): Promise<BookListResponse> {
    const { page, perPage, categoryId, sort } = query;

    let queryBook = {
      'categories._id': { $in: [new mongoose.Types.ObjectId(categoryId)] },
      isApproved: true,
    };

    // Todo agregar isCompleted

    let sortData = {};

    if (sort === 'views') {
      sortData = { views: -1 };
    } else if (sort === 'avgRating') {
      sortData = { avgRating: -1 };
    } else {
      sortData = { createdAt: -1 };
    }

    const contador = await this.bookModel.count(queryBook);

    // console.log(sortData);
    const book = await this.bookModel.aggregate([
      { $match: queryBook },
      { $sort: sortData },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
      { $project: this.aggregateProject() },
    ]);

    const totalPagina = Math.ceil(contador / perPage);

    return {
      book,
      totalPagina,
    };
  }


  
  async getBookDetail(query:QueryArgsBook){
    // const book = await this.findByIdBook(query.idNovel);
    // console.log(book)

    let queryBook = { '_id':new mongoose.Types.ObjectId(query.idNovel) };


    //Traer los capitulos de los libros

    const book = await this.bookModel.aggregate([
      { $match: queryBook },
      // { $sort: sortData },
      // { $skip: (page - 1) * perPage },
      // { $limit: perPage },
      { $project: this.aggregateProject() },
    ]);

    console.log(book)

    if (!book.length) BookFilterException.prototype.handlerDBError(null, 1);
    // console.log(book);

    return book;
  }


  //TODO ME GUSTA EL LIBRO
  //CREAR REPORTAR LIBRO


  private actualizarAdm(book: Book, updateBookInput: UpdateBookInput): Book {
    if (updateBookInput.bloquearLibro === 'si') book.isBlocked = true;
    if (updateBookInput.bloquearLibro === 'no') book.isBlocked = false;
    if (updateBookInput.activo === 'si') {
      book.isActive = true;
    }
    if (updateBookInput.activo === 'no') {
      book.isActive = false;
      book.isPublished = false;
    }

    return book;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} book`;
  // }


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
