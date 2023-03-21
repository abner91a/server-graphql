import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookfeatureInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
