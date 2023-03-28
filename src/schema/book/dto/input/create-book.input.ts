import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsObject, isObject, IsString, MinLength, validate, IsOptional, IsBoolean } from 'class-validator';
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

  @Field(() => Boolean, { nullable: true, defaultValue: false } )
  @IsOptional()
  @IsBoolean()
  isPublished:string;

  @Field(() =>[GraphQLJSONObject ])
  @IsArray()
  categories:string[];
}
