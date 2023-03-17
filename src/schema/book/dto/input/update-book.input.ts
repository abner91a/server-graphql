
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsString, IsMongoId, IsOptional, IsBoolean } from 'class-validator';
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
}
