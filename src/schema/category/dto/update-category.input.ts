import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from 'src/common/transform/mongoId.transform';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  // @Transform(toMongoObjectId)
  id: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Permite desactivar alguna categoria',

  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
