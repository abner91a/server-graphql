import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
@ObjectType()
export class Bookpart {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  @Field(() => ID)
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    index: true
  })
  @Field(() => ID)
  bookId: string;

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
    default: null
  })
  @Field(() => String, { nullable: true })
  content: string;

  //Valido iSactivo?
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


  //Cuando agregamos un capitulo
  @Prop({
    type: Boolean,
    default: false,
  })
  @Field(() => Boolean)
  isPublished: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  @Field(() => Boolean)
  isBlocked: boolean;

  @Prop({
    type: Number,
    default: 1,
  })
  @Field(() => Number)
  chapter: number;

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
  totalComments: number;

  @Prop({
    type: Number,
    default: 0,
  })
  @Field(() => Number)
  views: number;

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
    type: Date,
    default: Date.now,
  })
  @Field(() => Date)
  publishedOn: Date;
}

export const Bookpartchema = SchemaFactory.createForClass(Bookpart);
