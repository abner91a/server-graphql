import {
    BadRequestException,
    Logger,
    InternalServerErrorException,
  } from '@nestjs/common';
  
  export class ReportFilterException {
    handlerDBError(error, code?: number): never {
      // console.log(error.code)
  
      if (code === 1) {
        throw new BadRequestException('Error: Ya haz reportado este libro', {
          cause: new Error(),
          description: 'Ya reportado',
        });
      }

      if (code === 2) {
        throw new BadRequestException('Error: No puedes reportarte tu mismo', {
          cause: new Error(),
          description: 'No se puede reportar',
        });
      }

      if (code === 3) {
        throw new BadRequestException('Error: No Tienes privilegios para hacer estos cambios', {
          cause: new Error(),
          description: 'No se puede reportar',
        });
      }
  
      if (code === 4) {
        throw new BadRequestException('Error: Valores no validos', {
          cause: new Error(),
          description: 'Error valor no valido solo 1',
        });
      }

      if (code === 5) {
        throw new BadRequestException('Error: El reporte no existe', {
          cause: new Error(),
          description: 'Error: Reporte no existe',
        });
      }
      console.log(error);
  
      throw new InternalServerErrorException(
        'Error el server - check server logs',
      );
    }
  }
  