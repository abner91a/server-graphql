import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipes';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidRoles } from 'src/auth/enum/rol.valido';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { QueryUserAdminArgs } from 'src/common/dto/args/queryUserAdmin.args';
import { UserAllQueryArgs } from '../dto/args';
import { User } from '../entities/user.entity';
import { UserResponse } from '../type/userResponse';
import { UsersService } from '../users.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => User)
export class UsersResolverQueryAdmin {
  constructor(private readonly usersService: UsersService) {}

  //Get All User by Admin
  @Query(() => UserResponse, {
    name: 'getAllUserAdmin',
    description: 'Permite traer todo los usuarios de la BD - Rol administrador',
  })
  async getAllUser(
    @CurrentUser([ValidRoles.admin]) user: User,
    @Args() queryUser: QueryUserAdminArgs,
  ): Promise<UserResponse> {
    return this.usersService.findAllUserByadmin(queryUser);
  }

  @Query(() => User, { name: 'idUser',description: 'Busca un usuario por Id' } )
  async getUserbyId(
    @CurrentUser([ValidRoles.admin]) user: User,
    @Args('id', { type: () => ID }, ParseMongoIdPipe ) id: string,
  ): Promise<User> {
    return this.usersService.findUserById(id);
  }
  

  // @Query(() => [User], {
  //   name: 'getAllUser',
  //   description: 'Permite traer todo los usuarios de la BD - Rol administrador',
  // })
  // async getAllUser(
  //   @Args('query') query: UserAllQueryArgs ,
  //   @CurrentUser([(ValidRoles.admin)]) user: User,
  // ) {
  //   return this.usersService.findAllUser(query);
  // }

  // @Query(() => User)
  // borra1(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.addUser(createUserInput);
  // }

  // @Query(() => User)
  // borra2(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.addUser(createUserInput);
  // }
}
