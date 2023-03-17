import {
    BadRequestException,
    Logger,
    InternalServerErrorException,
  } from '@nestjs/common';
  
  export class BookFilterException {
    handlerDBError(error, code?: number): never {
      // console.log(error.code)
  
      if (code === 1) {
        throw new BadRequestException('Error: Id de libro no existe', {
          cause: new Error(),
          description: 'Libro no disponible',
        });
      }

      if (code === 2) {
        throw new BadRequestException('Error: Hubo un error al actualizar intente de nuevo', {
          cause: new Error(),
          description: 'Intente de nuevo actualizar el libro',
        });
      }
  
      if (code === 3) {
        throw new BadRequestException('Error: No tienes permiso para actualizar este libro', {
          cause: new Error(),
          description: 'No eres el creador del libro',
        });
      }
  
      if (code === 4) {
        throw new BadRequestException('Error: El titulo del libro existe usa otro nombre', {
          cause: new Error(),
          description: 'Nombre del titulo usado',
        });
      }
  
      console.log(error);
  
      throw new InternalServerErrorException(
        'Error el server - check server logs',
      );
    }
  }
  