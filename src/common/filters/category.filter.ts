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

    console.log(error);

    throw new InternalServerErrorException(
      'Error el server - check server logs',
    );
  }
}
