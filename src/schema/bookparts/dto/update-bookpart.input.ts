import { CreateBookpartInput } from './create-bookpart.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookpartInput extends PartialType(CreateBookpartInput) {
  @Field(() => Int)
  id: number;
}
