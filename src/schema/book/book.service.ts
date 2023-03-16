import { createReadStream } from 'fs';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, isValidObjectId } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { User } from '../users/entities/user.entity';
import { CreateBookInput, UpdateBookInput } from './dto/input';
import { Book } from './entities/book.entity';
import { BookFilterException } from 'src/common/filters/book.filter';

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
    };

    const categoriaCreada = await this.bookModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...createBookInput,
      authorId: user._id,
      authorName: user.fullname
    });
    return categoriaCreada;
  }

  async update(id: string, updateBookInput: UpdateBookInput, user:User) {

    const book = await this.findByIdBook(id);

    // console.log(book.authorId.toString(),user._id)

    if(book.authorId.toString() !== user._id.toString()) BookFilterException.prototype.handlerDBError(null, 3);

    if(updateBookInput.description)   book.description = updateBookInput.description;
    if(updateBookInput.categories)     book.categories = updateBookInput.categories;
    if(updateBookInput.title)    book.title = updateBookInput.title;


    book.updatedAt = new Date();


    if (!book) BookFilterException.prototype.handlerDBError(null, 2);

    book.save();
    
    return book;
  }


 async findByIdBook(id: string):Promise<Book> {
    const book = await this.bookModel.findById(id);

    if (!book) BookFilterException.prototype.handlerDBError(null, 1);


    return book;
  }


  // findAll() {
  //   return `This action returns all book`;
  // }


 

  // remove(id: number) {
  //   return `This action removes a #${id} book`;
  // }
}
