import { ExecutionContext } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    // if (request) {
    //   throw new InternalServerErrorException(
    //     `No hay usuario dentro de request - debe haber un guard`,
    //   );
    // }


    return request;
  }
}
