import { Field, ObjectType } from "@nestjs/graphql";
import { Category } from "../entities/category.entity";



@ObjectType()
export class CategoryUserResponse {
  @Field(() => [Category], { nullable: true })
  categoria: Category[];

  @Field(() => Number, { nullable: true })
  totalCategoria: number;

  @Field(() => Number, { nullable: true })
  totalPage: number;
}