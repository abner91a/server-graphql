import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookpartInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
