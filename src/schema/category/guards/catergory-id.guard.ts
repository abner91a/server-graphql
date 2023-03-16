import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { BadRequestException } from '@nestjs/common/exceptions';
import { CategoryService } from '../category.service';

@Injectable()
export class CategoryidGuard implements CanActivate {
 constructor(
  private readonly categoryService: CategoryService
 ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const datos = context.switchToHttp().getRequest();

    const idCategory = datos.params;
    const user = datos.user
    if (!isValidObjectId(idCategory)) {
      throw new BadRequestException(`${idCategory.id} no es un valor valido  `);
    }

    if(user.user_type !== 2 ){
      throw new BadRequestException(`${user.user_type} No tienes rango para actualizarla`);

    }


    const categoriaValida =  await this.categoryService.findCategoryById(idCategory.id);



    // 
    return true;
  }
}
