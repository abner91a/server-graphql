import {
  BadRequestException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';

export class UserFilterException {
  private logger: Logger = new Logger('UserService');
  handlerDBError(error, code?: number): never {
    // console.log(error.code)

    if (code === 1) {
      throw new BadRequestException('Error: Correo o Password Incorrecta', {
        cause: new Error(),
        description: 'Revisar Datos',
      });
    }

    if (code === 2) {
      throw new BadRequestException(
        'Error: Tu cuenta esta siendo eleminada o  Bloqueada',
        { cause: new Error(), description: 'Cuenta Bloqueada' },
      );
    }

    if (error.code === 11000) {
      // console.log(error)
      throw new BadRequestException(
        (error.message = 'Error: La cuenta existe'),
        { cause: new Error(), description: 'La cuenta ya existe' },
      );
      
    }

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Error el server - check server logs',
    );
  }
}
