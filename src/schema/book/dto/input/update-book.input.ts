
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsString, IsMongoId } from 'class-validator';
import { CreateBookInput } from './index';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => String)
  @IsMongoId()
  id: string;
}
