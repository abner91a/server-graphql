import { LoginInput } from './dto/args/login.args';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/schema/users/users.service';
import { SignupInput } from './dto/input/signup.input';

import { AuthResponse } from './types/auth-response.types';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schema/users/entities/user.entity';
import { UserFilterException } from 'src/common/filters/user.filter';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async addUser(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.userService.addUser(signupInput);

    //TODO TOKEN
    const token = this.getJWToken(user.id);

    // console.log('hola')


    return {
      token,
      user,
    };
  }

  async loginUser(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;

    const user = await this.userService.findOneByEmail(email);

    const passwordIsvalid = bcrypt.compareSync(password, user.password);

    if (!passwordIsvalid) UserFilterException.prototype.handlerDBError(null, 1);

    if (user.isBlocked || !user.isActive)
      UserFilterException.prototype.handlerDBError(null, 2);

    const token = this.getJWToken(user.id);

    return {
      token,
      user,
    };
  }

  async validarUsuarioToken(user: User): Promise<AuthResponse> {
    const usuario = await this.userService.findOneByUserId(user._id);
    if (user.isBlocked || !user.isActive)
      UserFilterException.prototype.handlerDBError(null, 2);

    const token = this.getJWToken(user.id);

    return {
      token,
      user,
    };
  }

  public async findbyUserId(id: string): Promise<User> {
    const usuario = await this.userService.findOneByUserId(id);

    if (usuario.isBlocked || !usuario.isActive)
      UserFilterException.prototype.handlerDBError(null, 2);

    return usuario;
  }

  private getJWToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }
}
