import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/input';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}


  ///Registro de Usuario
  // @Mutation(() => User, {name: 'createUser', description: 'Crea un usuario'})
  // createUser(@Args('addUser') createUserInput: CreateUserInput) {
  //   return this.usersService.addUser(createUserInput);
  // }

  @Query(() => User)
  borra1(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.addUser(createUserInput);
  }


  @Query(() => User)
  borra2(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.addUser(createUserInput);
  }


}
