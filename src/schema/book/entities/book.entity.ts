import { Category } from './../../category/entities/category.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

import { SchemaFactory, Prop } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Catype } from 'src/schema/category/dto/types/category.types';
interface categoria {
  _id: string;
  name: string;
}

@Schema()
@ObjectType()
export class Book extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  @Field(() => ID)
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  @Field(() => ID)
  authorId: string;

  @Prop({
    type: String,
    maxLength: 200,
    required: true,
    trim: true,
  })
  @Field(() => String)
  title: string;

  @Prop({
    type: String,
    trim: true,
  })
  @Field(() => String, { nullable: true })
  description: string;

  @Prop({
    type: String,
    default: 'book/img_no_data_found.png',
  })
  @Field(() => String, { nullable: true })
  image: string;

  @Prop([
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
      name: {
        type: String,
      },
    },
  ])
  @Field(() => [Catype], { nullable: true })
  categories: string[];

  @Prop({
    type: Boolean,
    default: false,
  })
  @Field(() => Boolean)
  isActive: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  @Field(() => Boolean)
  isApproved: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  @Field(() => Boolean)
  isBlocked: boolean;

  @Prop({
    type: Number,
    default: 0.0,
  })
  @Field(() => Number)
  avgRating: number;

  @Prop({
    type: Number,
    default: 0,
  })
  @Field(() => Number)
  ratingCounts: number;

  @Prop({
    type: Number,
    default: 0,
  })
  @Field(() => Number)
  reviewCounts: number;

  @Prop({
    type: Number,
    default: 0,
  })
  @Field(() => Number)
  commentCounts: number;

  @Prop({
    type: Number,
    default: 0,
  })
  @Field(() => Number)
  totalComments: number;

  @Prop({
    type: Number,
    default: 0,
  })
  @Field(() => Number)
  total_chapters: number;

  @Prop({
    type: Number,
    default: 0,
  })
  @Field(() => Number)
  views: number;

  @Prop({
    type: String,
  })
  @Field(() => String, { nullable: true })
  authorName: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  @Field(() => Date)
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  @Field(() => Date)
  updatedAt: Date;

  @Prop({
    type: Boolean,
    default: false,
  })
  @Field(() => Boolean)
  isCompleted: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  @Field(() => Boolean)
  isPublished: boolean;

  @Field(() => String, {nullable: true, description: "Solo para obtener la imagen con cdn"})
  imageCDN: string;

  //isCompleted Todo agregar
}

export const BookSchema = SchemaFactory.createForClass(Book);
