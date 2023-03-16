import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Catype {

  @Field(() => ID )
  _id: string;

  @Field(() => String)
  name: string;
}


@ObjectType()
export class CatypeValido {

  @Field(() => ID )
  _id: string;

  @Field(() => String)
  name: string;
}

