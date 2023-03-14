import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';


@InputType()
export class CreateCategoryInput {

  @Field(() => String)
  @IsString()
  @MinLength(5)
  name: string;

  @Field(() => String, {nullable: true})
  @IsString()
  image: string;
}
