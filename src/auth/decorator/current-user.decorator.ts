import {
    createParamDecorator,
    ExecutionContext,
    ForbiddenException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { GqlExecutionContext } from '@nestjs/graphql';
import { UserFilterException } from 'src/common/filters/user.filter';
import { User } from 'src/schema/users/entities/user.entity';
import { ValidUser_type } from '../enum/rol.valido';

  
  export const CurrentUser = createParamDecorator(
    (user_type: ValidUser_type = 0, context: ExecutionContext) => {

      //VALIDAMOS QUE VENGA DE HTTTP LOGEADO
      if (context.getType() === 'http') {
        const user = context.switchToHttp().getRequest().user;
  
        if (!user) {
          throw new InternalServerErrorException(
            `No hay usuario dentro de request - debe haber un guard`,
          );
        }
  
        if (user_type === user.user_type) {
          return user;
        } else if (user.user_type === 2) {
          return user;
        }
        throw new ForbiddenException(
          `Usuario: no tiene permiso para acceder a este recurso `,
        );
      }
  
      const ctx = GqlExecutionContext.create(context);
  
      const user: User = ctx.getContext().req.user;
      
      
  
      if (!user) {
        throw new InternalServerErrorException(
          `No hay usuario dentro de request - debe haber un guard`,
        );
      }
  
      //Bloquea usuarios baneados
      if (user.isBlocked || !user.isActive) UserFilterException.prototype.handlerDBError(null, 2)
  
      // console.log(user)
  
      if (user_type === user.user_type) {
        return user;
      } else if (user.user_type === 2) {
        return user;
      }
  
      throw new ForbiddenException(`${user.fullname} no tienes permiso para esta pagina `);
    },
  );
  