import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidRoles } from 'src/auth/enum/rol.valido';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UserAllQueryArgs } from '../dto/args';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => User)
export class UsersResolverQueryAdmin {
  constructor(private readonly usersService: UsersService) {}


  @Query(() => [User], {
    name: 'getAllUser',
    description: 'Permite traer todo los usuarios de la BD - Rol administrador',
  })
  async getAllUser(
    @Args('query') query: UserAllQueryArgs ,
    @CurrentUser([(ValidRoles.admin)]) user: User,
  ) {
    return this.usersService.findAllUser(query);
  }

  // @Query(() => User)
  // borra1(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.addUser(createUserInput);
  // }

  // @Query(() => User)
  // borra2(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.addUser(createUserInput);
  // }
}
