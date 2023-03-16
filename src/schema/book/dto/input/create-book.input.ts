import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsObject, isObject, IsString, MinLength, validate } from 'class-validator';
import { GraphQLObjectType } from 'graphql';
import GraphQLJSON, { GraphQLJSONObject  } from 'graphql-type-json';



@InputType()
export class CreateBookInput {

  @Field(() => String )
  @IsString()
  @MinLength(5)
  title:string;

  @Field(() => String, { nullable: true } )
  @IsString()
  description:string;

  @Field(() =>[GraphQLJSONObject ])
  @IsArray()
  categories:string[];
}
