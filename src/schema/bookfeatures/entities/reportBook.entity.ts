import { ObjectType, Field, ID } from '@nestjs/graphql';

import { SchemaFactory, Prop } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';



@Schema()
@ObjectType()
export class ReportBook extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  @Field(() => ID)
  userIdReport: string;

  @Prop({
    type: String,
    maxLength: 200,
    required: true,
    trim: true,
  })
  @Field(() => String)
  userEmail: string;


  @Prop({
    type: String,
    maxLength: 200,
    required: true,
    trim: true,
  })
  @Field(() => String)
  booktitle: string;

  @Prop({
    type: String,
    trim: true,
  })
  @Field(() => String)
  reason: string;


  @Prop({
    type: String,
    trim: true,
  })
  @Field(() => String)
  reasonDetails: string;

  @Prop({
    type: Number
  })
  @Field(() => Number)
  status: number;

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

}

export const ReportBookchema = SchemaFactory.createForClass(ReportBook);
