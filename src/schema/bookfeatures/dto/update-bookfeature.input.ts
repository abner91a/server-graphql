import { CreateBookfeatureInput } from './create-bookfeature.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookfeatureInput extends PartialType(CreateBookfeatureInput) {
  @Field(() => Int)
  id: number;
}
