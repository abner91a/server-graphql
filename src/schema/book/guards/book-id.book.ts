import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { BadRequestException } from '@nestjs/common/exceptions';
import { BookService } from '../book.service';
import { BookFilterException } from 'src/common/filters/book.filter';

@Injectable()
export class BookidGuard implements CanActivate {
 constructor(
  private readonly bookService: BookService
 ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const datos = context.switchToHttp().getRequest();

    const idbook = datos.params;
    const user = datos.user
    if (!isValidObjectId(idbook)) {
      throw new BadRequestException(`${idbook.id} no es un valor valido  `);
    }

    // if(user.user_type !== 2 ){
    //   throw new BadRequestException(`${user.user_type} No tienes rango para actualizarla`);

    // }


    // const bookValido =  await this.categoryService.findCategoryById(idCategory.id);


    const bookValido = await this.bookService.findByIdBook(idbook.id);
    
    if(user.user_type === 2 ){
      // console.log(user._id.toString())
      // console.log(bookValido.authorId.toString())
      return true
    }

    // console.log(user._id.toString())
    // console.log(bookValido.authorId.toString())


    if(user._id.toString() !== bookValido.authorId.toString())  BookFilterException.prototype.handlerDBError(null, 3);


      //  console.log(bookValido)
      // console.log(user)



    // 
    return true;
  }
}
