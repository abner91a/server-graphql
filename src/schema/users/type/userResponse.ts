import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';





@ObjectType()
export class UserResponse{

    @Field(()=> [User])
    user: User[] ;

    @Field(()=> Number)
    totalPagina: number ;
}