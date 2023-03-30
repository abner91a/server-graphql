import { BookService } from 'src/schema/book/book.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AddBookPart, AddBookPartAdmin, EditBookPartAdmin } from './dto/input';
import { InjectModel } from '@nestjs/mongoose';
import { Bookpart } from './entities/bookpart.entity';
import mongoose, { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { BookPartFilterException } from 'src/common/filters/bookPart.filter';
import { QueryBookPartArgs } from './dto/args/query.bookparts.args';
import {
  BookListReadResponse,
  getAllBookListReadResponse,
  readBookListReadResponse,
} from './types/bookPart.types';
import { QueryBookAllPartArgs } from './dto/args';
import axios from 'axios';
import { EditBookPartUser } from './dto/input/editBookPart';
import { Book } from '../book/entities/book.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';

@Injectable()
export class BookpartsService {
  constructor(
    @Inject(forwardRef(() => BookService))
    private readonly bookService: BookService,
    @InjectModel(Bookpart.name)
    private readonly bookPartModel: Model<Bookpart>,
  ) {}

  //admin
  async addPartBookAdmin(
    addBookPartAdmin: AddBookPartAdmin,
    user: User,
  ): Promise<Bookpart> {
    const { idBook, title, content, isActive } = addBookPartAdmin;

    const existBook = await this.bookService.findByIdBook(idBook);

    const existeBookPart = await this.bookPartModel.findOne({ title });
    if (existeBookPart)
      BookPartFilterException.prototype.handlerDBError(null, 5);

    const rol = user.roles.some((rol) => rol === 'admin' || rol === 'editor');
    if (!rol) BookPartFilterException.prototype.handlerDBError(null, 1);

    let queryBook = {
      bookId: new mongoose.Types.ObjectId(idBook),
      // isPublished: false,
    };

    const lastChapter = await this.bookPartModel.aggregate([
      { $match: queryBook },
      { $sort: { chapter: -1 } },
      { $limit: 1 },
      { $project: this.aggregateProject() },
    ]);

    if (!lastChapter.length) {
      const firstChapter = await this.bookPartModel.create({
        _id: new mongoose.Types.ObjectId(),
        title,
        content,
        bookId: new mongoose.Types.ObjectId(idBook),
        authorId: user._id,
        isActive,
      });

      existBook.total_chapters = 1;
      existBook.updatedAt = new Date();
      existBook.save();

      return firstChapter;
    }

    const addchapter = await this.bookPartModel.create({
      _id: new mongoose.Types.ObjectId(),
      title,
      content,
      bookId: new mongoose.Types.ObjectId(idBook),
      chapter: lastChapter[0].chapter + 1,
      authorId: user._id,
      isActive,
    });

    existBook.total_chapters = lastChapter[0].chapter + 1;
    existBook.updatedAt = new Date();
    existBook.save();

    return addchapter;
  }

  async updateChapterAdmin(editBookPart: EditBookPartAdmin, user: User) {
    const { id, title, content, isActive } = editBookPart;

    if(editBookPart.title){    
      const existTitle = await this.bookPartModel.findOne({ title: editBookPart.title });
      if (existTitle) BookPartFilterException.prototype.handlerDBError(null, 5);
     }
  

    const existChapter = await this.findByChapterBook(id);

    const rol = user.roles.some((rol) => rol === 'admin' || rol === 'editor');
    if (!rol) BookPartFilterException.prototype.handlerDBError(null, 1);

    if (editBookPart.title) {
      existChapter.title = editBookPart.title.trim();
    }

    if (editBookPart.content) {
      existChapter.content = editBookPart.content;
    }
    if (editBookPart.isActive === false || editBookPart.isActive === true) {
      existChapter.isActive = editBookPart.isActive;
    }

    if (editBookPart.isApproved === false || editBookPart.isApproved === true) {
      existChapter.isApproved = editBookPart.isApproved;
    }

    if (
      editBookPart.isPublished === false ||
      editBookPart.isPublished === true
    ) {
      existChapter.isPublished = editBookPart.isPublished;
    }

    existChapter.updatedAt = new Date();
    await existChapter.save();
    return existChapter;
  }

  ///user
  async addPartBookUser(addBookPart: AddBookPart, user: User) {
    const { idBook, title, content, isPublished } = addBookPart;

    const existBook = await this.bookService.findByIdBook(idBook);

    if (user._id.toString() !== existBook.authorId.toString()) {
      BookPartFilterException.prototype.handlerDBError(null, 1);
    }

    const existTitle = await this.bookPartModel.findOne({ title });
    if (existTitle) BookPartFilterException.prototype.handlerDBError(null, 5);

    let queryBook = {
      bookId: new mongoose.Types.ObjectId(idBook),
      // isPublished: false,
    };

    const lastChapter = await this.bookPartModel.aggregate([
      { $match: queryBook },
      { $sort: { chapter: -1 } },
      { $limit: 1 },
      { $project: this.aggregateProject() },
    ]);

    if (!lastChapter.length) {
      const firstChapter = await this.bookPartModel.create({
        _id: new mongoose.Types.ObjectId(),
        title,
        content,
        bookId: new mongoose.Types.ObjectId(idBook),
        authorId: user._id,
      isPublished,

      });

      existBook.total_chapters = 1;
      existBook.updatedAt = new Date();
      existBook.save();

      return firstChapter;
    }

    //funcional



    const addchapter = await this.bookPartModel.create({
      _id: new mongoose.Types.ObjectId(),
      title,
      content,
      bookId: new mongoose.Types.ObjectId(idBook),
      chapter: lastChapter[0].chapter + 1,
      authorId: user._id,
      isPublished,
    });

    existBook.total_chapters = lastChapter[0].chapter + 1;
    existBook.updatedAt = new Date();
    existBook.save();

    return addchapter;
  }

  async updateChapterUser(editBookPart: EditBookPartUser, user: User) {

    if(editBookPart.title){    
    const existTitle = await this.bookPartModel.findOne({ title: editBookPart.title });
    if (existTitle) BookPartFilterException.prototype.handlerDBError(null, 5);
   }


    const existChapter = await this.findByChapterBook(editBookPart.idpartBook);

    //Validamos si el autor es el original
    if (user._id.toString() !== existChapter.authorId.toString())
      BookPartFilterException.prototype.handlerDBError(null, 1);

    if (editBookPart.title) {
      // console.log(editBookPart.title.trim())
      existChapter.title = editBookPart.title.trim();
    }

    if (editBookPart.content) {
      existChapter.content = editBookPart.content;
    }

    if(editBookPart.isPublished === false || editBookPart.isPublished === true) {
      existChapter.isPublished = editBookPart.isPublished;
    }

    existChapter.updatedAt = new Date();
    existChapter.save();
    return existChapter;
  }

  async findByChapterBook(id: string) {
    const existChapter = await this.bookPartModel.findById(id);

    if (!existChapter)
      BookPartFilterException.prototype.handlerDBError(null, 2);

    return existChapter;
  }

  async findOneBookPartOne(id: string) {
    const existBook = await this.bookPartModel.findById(id);

    if (!existBook) BookPartFilterException.prototype.handlerDBError(null, 2);

    return existBook;
  }

  async readNovel(query: QueryBookPartArgs): Promise<readBookListReadResponse> {
    const {
      bookId,
      //  bookChapterId
      page,
      perPage = 1,
    } = query;

    const book = await this.bookService.findByIdBook(bookId);
    let bookPart;
    let sigPage;
    let anteriorPage;

    // console.log('hola')

    if (query.bookChapterId) {
      bookPart = await this.getChapterReadId(query);
      // console.log(bookPart);

      sigPage = bookPart[0].chapter + 1;

      if (sigPage === book.total_chapters + 1) sigPage = null;

      anteriorPage = bookPart[0].chapter - 1;
    } else {
      bookPart = await this.getChapterNoId(query);
      sigPage = page + 1;

      if (sigPage === book.total_chapters + 1) sigPage = null;

      anteriorPage = page - 1;
    }
    return {
      bookPart,
      book,
      sigPage,
      anteriorPage,
      // totalChapter,
    };
  }

  async getAllChapter(
    query: QueryBookAllPartArgs,
  ): Promise<getAllBookListReadResponse> {
    let { bookId, page, perPage } = query;

    let queryBook = {
      bookId: new mongoose.Types.ObjectId(bookId),
      // isPublished: false,
    };

    // perPage = 1;

    const bookPart = await this.bookPartModel.aggregate([
      { $match: queryBook },
      { $sort: { chapter: 1 } },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
      // { $project: this.chapterProject() },
    ]);

    if (!bookPart.length)
      BookPartFilterException.prototype.handlerDBError(null, 3);

    return {
      bookPart,
    };
  }

  private async getChapterNoId(query: QueryBookPartArgs) {
    let queryBook = {
      // _id: new mongoose.Types.ObjectId('641d49e1537972691bb634a5'),
      bookId: new mongoose.Types.ObjectId(query.bookId),
      // isPublished: false,
    };

    const bookPart = await this.bookPartModel.aggregate([
      { $match: queryBook },
      // { $sort: { chapter: 1 } },
      { $skip: (query.page - 1) * query.perPage },
      { $limit: query.perPage },
    ]);

    if (!bookPart.length)
      BookPartFilterException.prototype.handlerDBError(null, 4);

    return bookPart;
  }

  private async getChapterReadId(query: QueryBookPartArgs) {
    let queryBook = {
      _id: new mongoose.Types.ObjectId(query.bookChapterId),
      bookId: new mongoose.Types.ObjectId(query.bookId),
      // isPublished: false,
    };

    const bookPart = await this.bookPartModel.aggregate([
      { $match: queryBook },
      // { $sort: { chapter: 1 } },
      // { $skip: (query.page - 1) * query.perPage },
      { $limit: 1 },
    ]);

    // console.log(bookPart)

    if (!bookPart.length)
      BookPartFilterException.prototype.handlerDBError(null, 4);

    return bookPart;
  }



  async getAllChapterByBook(  book:Book, paginationArgs:PaginationArgs ): Promise<Bookpart[]> {
    const {page, perPage } = paginationArgs;
    const { _id } = book;

    let queryBook = {
      bookId: _id,
      // isPublished: false,
    };

    // console.log(_id)


    const bookPart = await this.bookPartModel.aggregate([
      { $match: queryBook },
      { $sort: { chapter: 1 } },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
      // { $project: this.chapterProject() },
    ]);

    console.log(bookPart)

    if (!bookPart.length)
      BookPartFilterException.prototype.handlerDBError(null, 3);

    return bookPart;
  }

  //Todo HACER UNA LISTA DE CAPITULOS

  // findAll() {
  //   return `This action returns all bookparts`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} bookpart`;
  // }

  // update(id: number, updateBookpartInput: UpdateBookpartInput) {
  //   return `This action updates a #${id} bookpart`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} bookpart`;
  // }

  // async findByChapterExist(idbook: string) {
  //   const lastChapter = await this.bookModel
  //     .find({ bookId: new mongoose.Types.ObjectId(idbook) })
  //     .limit(1)
  //     .sort({ chapter: -1 });

  //   return lastChapter;
  // }

  private aggregateProject() {
    return {
      _id: 0,
      // bookId: 1,
      title: 1,
      // content: 1,
      // isActive: 1,
      // isApproved: 1,
      // isBlocked: 1,
      chapter: 1,
      // avgRating: 1,
      // ratingCounts: 1,
      // reviewCounts: 1,
      // totalComments: 1,
      // views: 1,
      // createdAt: 1,
      // updatedAt: 1,
      // isPublished: 1,
      // publishedOn: 1,
    };
  }

  private chapterProject() {
    return {
      _id: 1,
      // bookId: 1,
      title: 1,
      // content: 1,
      // isActive: 1,
      // isApproved: 1,
      // isBlocked: 1,
      chapter: 1,
      content: 1,
      // avgRating: 1,
      // ratingCounts: 1,
      // reviewCounts: 1,
      // totalComments: 1,
      // views: 1,
      // createdAt: 1,
      // updatedAt: 1,
      // isPublished: 1,
      // publishedOn: 1,
    };
  }
}

// let queryBook = {
//   bookId: new mongoose.Types.ObjectId(idBook),
//   isPublished: false,
// };

// const lastChapter = await this.bookModel.aggregate([
//   { $match: queryBook },
//   { $sort: { chapter: -1 } },
//   { $limit: 1 },
//   { $project: this.aggregateProject() },
// ]);

// const add = await this.bookModel.create({
//   _id: new mongoose.Types.ObjectId(),
//   title,
//   content,
//   bookId: new mongoose.Types.ObjectId(idBook),
// });

//  const lastChapter = await this.bookModel.find({bookId:new mongoose.Types.ObjectId(idBook) })

// const revisarChapter = await this.findByChapterExist(idBook)

// const lastChapter = await this.bookModel.findOne({bookId :new mongoose.Types.ObjectId(idBook) }).limit(1).sort({ chapter: -1 });
