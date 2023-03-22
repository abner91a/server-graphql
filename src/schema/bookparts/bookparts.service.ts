import { BookService } from 'src/schema/book/book.service';
import { Injectable } from '@nestjs/common';
import { AddBookPart } from './dto/input';
import { InjectModel } from '@nestjs/mongoose';
import { Bookpart } from './entities/bookpart.entity';
import mongoose, { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { BookPartFilterException } from 'src/common/filters/bookPart.filter';
import { EditBookPart } from './dto/input/editBookPart';

@Injectable()
export class BookpartsService {
  constructor(
    private readonly bookService: BookService,
    @InjectModel(Bookpart.name)
    private readonly bookPartModel: Model<Bookpart>,
  ) {}

  async addPartBook(addBookPart: AddBookPart, user: User) {
    const { idBook, title, content } = addBookPart;

    const existBook = await this.bookService.findByIdBook(idBook);

    if (user._id.toString() !== existBook.authorId.toString()) BookPartFilterException.prototype.handlerDBError(null,1)

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
    });

    existBook.total_chapters = lastChapter[0].chapter + 1;
    existBook.updatedAt = new Date();
    existBook.save();

    return addchapter;
  }



  async updateChapter(editBookPart:EditBookPart,user:User){

    const existChapter = await this.findByChapterBook(editBookPart.idpartBook);



    //Validamos si el autor es el original
    if (user._id.toString() !== existChapter.authorId.toString()) BookPartFilterException.prototype.handlerDBError(null,1)
  

    if(editBookPart.title){
      // console.log(editBookPart.title.trim())
      existChapter.title = editBookPart.title.trim();
    }
    
    if(editBookPart.content){
      existChapter.content = editBookPart.content;
    }

    existChapter.updatedAt = new Date();
    existChapter.save();
    return existChapter;

  }


  async findByChapterBook(id:string){
    const existChapter = await this.bookPartModel.findById(id);

    if(!existChapter)  BookPartFilterException.prototype.handlerDBError(null,2)

    return existChapter;
  }


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
