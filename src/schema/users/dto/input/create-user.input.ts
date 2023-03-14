import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString,MinLength,IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {

  @Field(() => String )
  @IsString()
  @MinLength(5)
  fullname:string;

  @Field( ()=> String  )
  @IsEmail()
  email:string

  @Field( ()=> String  )
  @MinLength(6)
  password:string

}
