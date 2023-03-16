import { Category } from './../../category/entities/category.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';


import mongoose, { Document } from 'mongoose';
import { Catype } from 'src/schema/category/dto/types/category.types';

@ObjectType()
export class BookList {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  authorId: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => [Catype], { nullable: true })
  categories: string[];

  @Field(() => Boolean)
  isActive: boolean;


  @Field(() => Boolean)
  isApproved: boolean;

  @Field(() => Boolean)
  isBlocked: boolean;


  @Field(() => Number)
  avgRating: number;


  @Field(() => Number)
  ratingCounts: number;


  @Field(() => Number)
  reviewCounts: number;


  @Field(() => Number)
  commentCounts: number;


  @Field(() => Number)
  totalComments: number;


  @Field(() => Number)
  total_chapters: number;

 
  @Field(() => Number)
  views: number;


  @Field(() => String, { nullable: true })
  authorName: string;

  @Field(() => Date)
  createdAt: Date;


  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Number, { nullable: true })
  totalPage: number;


  //isCompleted Todo agregar
}

