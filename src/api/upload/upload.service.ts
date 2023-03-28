import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import multer, { diskStorage } from 'multer';
import BunnyCDNStorage from 'src/common/config/bunnyCdn.config';
import { BookService } from 'src/schema/book/book.service';
import { CategoryService } from 'src/schema/category/category.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { fileFilter } from './helpers/file-filter.helpers';
import { fileNamer } from './helpers/fileNamer.helpers';


@Injectable()
export class UploadService {
  constructor(private readonly categoryService: CategoryService, private readonly bookService: BookService
    ) {}



  async uploadFileCategory(id, file) {
    if (!file) {
      throw new BadRequestException('Debes enviar una imagen valida');
    }

    const categoria = await this.categoryService.findByIdUpdate(id, file);

    categoria.image = `category/${file.filename}`;
    categoria.imageCDN = `${process.env.CDN_CATEGORIA_IMG}category/${file.filename}`;

    const bunnyCategory = new BunnyCDNStorage(
      process.env.IMAGEN_KEY,
      'api-gatito',
      'category',
    );
    
    await bunnyCategory.upload(file.path);

    
    return categoria;
  }

  async uploadFileBook(id, file) {
    if (!file) {
      throw new BadRequestException('Debes enviar una imagen valida');
    }

    const book = await this.bookService.findByIdUpdateBookPortada(id, file);

    // console.log(book)


    book.image = `book/${file.filename}`;

    // const bunny = new BunnyCDNStorage(
    //   process.env.IMAGEN_KEY,
    //   'api-gatito',
    //   'book',
    // );
 
    // const img = await bunny.upload(file.path);

    
    return book;
  }


  // findAll() {
  //   return `This action returns all upload`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} upload`;
  // }

  // update(id: number, updateUploadDto: UpdateUploadDto) {
  //   return `This action updates a #${id} upload`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} upload`;
  // }
}
