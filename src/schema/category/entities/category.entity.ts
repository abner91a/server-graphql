import { ObjectType, Field, ID } from '@nestjs/graphql';

import { SchemaFactory, Prop } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Category extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  @Field(() => ID)
  _id: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    default: null
  })
  @Field(() => String)
  name: string;

  @Prop({
    type: String,
    default: null,
  })
  @Field(() => String, { nullable: true })
  image: string;

  @Prop({
    type: Number,
    default: 0,
  })
  booksCount: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  @Field(() => String)
  isActive: boolean;

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

  @Field(() => String, {nullable: true, description: "Solo para obtener la imagen con cdn"})
  imageCDN: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
