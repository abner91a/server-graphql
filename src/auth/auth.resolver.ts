import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/schema/users/entities/user.entity';
import { SignupInput } from './dto/input/signup.input';
import { AuthResponse } from './types/auth-response.types';
import { LoginInput } from './dto/args/login.args';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorator/current-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, {
    name: 'createUsers',
    description: 'Crea un usuario',
  })
  createUser(@Args('addUser') signupInput: SignupInput) {
    return this.authService.addUser(signupInput);
  }

  // @Query(() => [AuthResponse], { name: 'auth' })
  // findAll() {
  //   return this.authService.findAll();
  // }

  @Query(() => AuthResponse, {
    name: 'login',
    description: 'Logea un usuario validado',
  })
  async loginAuth(
    @Args('login') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    return await this.authService.loginUser(loginInput);
  }

  @Query(() => AuthResponse, {
    name: 'revisarToken',
    description: 'Desarrollo solo, para comprobar token',
  })
  @UseGuards(JwtAuthGuard)
  async validandoToken(
    @CurrentUser(/* [(ValidRoles.admin, ValidRoles.user, ValidRoles.editor)] */) user: User,
  ): Promise<AuthResponse> {
    // console.log(user)

    // console.log(user)
    return this.authService.validarUsuarioToken(user);
  }

  // @Query(() => Auth, { name: 'auth' })
  // findAll() {
  //   return this.authService.findAll();
  // }
}
