import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { BadRequestException } from '@nestjs/common/exceptions';
import { CategoryService } from '../category.service';
import { ValidRoles } from 'src/auth/enum/rol.valido';

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

    for (const role of user.roles) {
      // console.log(role)
        if(role === ValidRoles.admin){
          const categoriaValida =  await this.categoryService.findCategoryById(idCategory.id);
          return true
        }
    }


  
    throw new BadRequestException(` No tienes privilegios para realizar esta accion  `);


    // 
    return false;
  }
}
