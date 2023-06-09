import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserFilterException } from 'src/common/filters/user.filter';
import { User } from 'src/schema/users/entities/user.entity';
import { ValidRoles } from '../enum/rol.valido';

export const CurrentUser = createParamDecorator(
  // (user_type: ValidUser_type = 0, context: ExecutionContext) => {

  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    //VALIDAMOS QUE VENGA DE HTTTP LOGEADO
    if (context.getType() === 'http') {
      const user = context.switchToHttp().getRequest().user;

      if (!user) {
        throw new InternalServerErrorException(
          `No hay usuario dentro de request - debe haber un guard`,
        );
      }

      if (roles.length === 0) return user;

      for (const role of user.roles) {
        // TODO: Eliminar Valid Roles
        if (roles.includes(role as ValidRoles)) {
          return user;
        }
      }

      // if (user_type === user.user_type) {
      //   return user;
      // } else if (user.user_type === 2) {
      //   return user;
      // }
      // throw new ForbiddenException(
      //   `Usuario: no tiene permiso para acceder a este recurso `,
      // );
    }

    const ctx = GqlExecutionContext.create(context);

    const user: User = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException(
        `No hay usuario dentro de request - debe haber un guard`,
      );
    }

    //Bloquea usuarios baneados
    if (user.isBlocked || !user.isActive)
      UserFilterException.prototype.handlerDBError(null, 2);

    if (roles.length === 0) return user;

    for (const role of user.roles) {
      if (typeof role === 'string' && roles.includes(role as ValidRoles)) {
        return user;
      }
    }

    throw new ForbiddenException(
      `${user.fullname} no tienes permiso para esta pagina `,
    );
  },
);
