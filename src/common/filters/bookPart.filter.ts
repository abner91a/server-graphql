import {
    BadRequestException,
    Logger,
    InternalServerErrorException,
  } from '@nestjs/common';
  
  export class BookPartFilterException {
    handlerDBError(error, code?: number): never {
      // console.log(error.code)
  
      if (code === 1) {
        throw new BadRequestException('Error: No tienes permiso para editar este capitulo', {
          cause: new Error(),
          description: 'Capitulo no disponible',
        });
      }

      if (code === 2) {
        throw new BadRequestException('Error: No existe el capitulo', {
          cause: new Error(),
          description: 'No existe el capitulo',
        });
      }

      if (code === 3) {
        throw new BadRequestException('Error: No existe el libro', {
          cause: new Error(),
          description: 'No existe el libro',
        });
      }
  
      console.log(error);
  
      throw new InternalServerErrorException(
        'Error el server - check server logs',
      );
    }
  }
  