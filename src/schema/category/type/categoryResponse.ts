import { Field, ObjectType } from "@nestjs/graphql";
import { Category } from "../entities/category.entity";



@ObjectType()
export class CategoryAdminResponse {
  @Field(() => [Category], { nullable: true })
  categoria: Category[];

  @Field(() => Number, { nullable: true })
  totalCategory: number;
}