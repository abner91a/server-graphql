import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsBoolean, IsOptional, IsString, MinLength } from "class-validator";
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class CreateBookInputAdmin {

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