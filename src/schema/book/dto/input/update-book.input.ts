
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsString, IsMongoId, IsOptional, IsBoolean, IsArray, MinLength } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { CreateBookInput } from './index';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => String)
  @IsMongoId()
  id: string;

  @Field(() => String, {nullable: true,description:"Si true y no false"})
  @IsOptional()
  @IsString()
  publicar: string;

  @Field(() => String, {nullable: true,description:"Si true y no false"})
  @IsOptional()
  @IsString()
  completado: string;

  @Field(() => String, {nullable: true,description:"Si true y no false"})
  @IsOptional()
  @IsString()
  bloquearLibro: string;

  
  @Field(() => String, {nullable: true,description:"Si true y no false"})
  @IsOptional()
  @IsString()
  activo: string;

  @Field(() => String, {nullable: true,description:"Si true y no false"})
  @IsOptional()
  @IsString()
  isApprovedBook: string;

  
  @Field(() => String, {nullable: true,description:"Pon e rol del admin"})
  @IsOptional()
  @IsString()
  rol: string;

}

@InputType()
export class UpdateBookUserInput {
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

}

