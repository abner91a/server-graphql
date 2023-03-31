import { ObjectType, Field,ID } from '@nestjs/graphql';

import { SchemaFactory,Prop } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from 'src/schema/book/entities/book.entity';

@Schema()
@ObjectType()
export class User extends Document {

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,

  })
  @Field(()=> ID)
  _id: string;

  @Prop({
    type: String, 
    required: true,
    trim: true,
    index: { unique: true },
  })
  @Field(() => String )
  email:string;



  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  @Field(() => String )
  fullname:string;



  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  // @Field(() => String )
  password:string;


  // //TODO: Eliminar de mongo en la siguiente actualizacion ala BD
  // @Prop({
  //   type: Number,
  //   default: 1,
  //   required: true,
  // })
  // @Field(() => Number )
  // //Revisar usuario
  // user_type:number;

  @Prop({
    type: [String],
    default: ['user']
  })
  @Field( () => [String] )
  roles: string[]



  @Prop({
    type: Boolean,
    required: true,
    default: true,
  })
  @Field(() => String )
  isActive:boolean;


  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  @Field(() => String )
  isBlocked:boolean;


  @Prop({
    type: Date,
    default: Date.now,
  })
  @Field(() => Date )
  createdAt:boolean;

  @Prop({
    type: Date,
    default: Date.now,
  })
  @Field(() => Date )
  updatedAt:boolean;

  @Field(() => [Book])
  book: Book[];
}

export const UserSchema = SchemaFactory.createForClass(User);
