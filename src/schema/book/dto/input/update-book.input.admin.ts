import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsBoolean, IsMongoId, IsOptional, IsString, MinLength } from "class-validator";
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class UpdateBookAdminInput {
  @Field(() => String)
  @IsMongoId()
  id: string;

  @Field(() =>[GraphQLJSONObject ], {nullable: true})
  @IsOptional()
  @IsArray()
  categories:string[];

  @Field(() => String, {nullable: true} )
  @IsOptional()
  @IsString()
  @MinLength(5)
  title:string;

  @Field(() => String, {nullable: true} )
  @IsOptional()
  @IsString()
  description:string;

  // @Field(() => Boolean, {nullable: true} )
  // @IsOptional()
  // @IsBoolean()
  // isPublished:boolean;

  @Field(() => Boolean, {nullable: true} )
  @IsOptional()
  @IsBoolean()
  isCompleted:boolean;

  @Field(() => Boolean, {nullable: true} )
  @IsOptional()
  @IsBoolean()
  isActive:boolean;

}
