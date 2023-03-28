import {
  BadRequestException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';

export class CategoryFilterException {
  handlerDBError(error, code?: number): never {
    // console.log(error.code)

    if (code === 1) {
      throw new BadRequestException('Error: Id de categoria no existe', {
        cause: new Error(),
        description: 'Categoria no disponible',
      });
    }

    if (code === 2) {
      throw new BadRequestException('Error: Nombre de la categoria  existe', {
        cause: new Error(),
        description: 'Categoria existe',
      });
    }

    if (code === 3) {
      throw new BadRequestException('Error: Fuera limita de pagina', {
        cause: new Error(),
        description: 'Fuera limite de pagina',
      });
    }



    console.log(error);

    throw new InternalServerErrorException(
      'Error el server - check server logs',
    );
  }
}
