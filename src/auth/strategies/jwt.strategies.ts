import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFilterException } from 'src/common/filters/user.filter';
import { User } from 'src/schema/users/entities/user.entity';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '../interface/jwtPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const { id } = payload;

    const user = await this.authService.findbyUserId(id);

    if (!user) UserFilterException.prototype.handlerDBError(null, 1);


    return user;
  }
}
