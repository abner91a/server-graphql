import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, isString, IsString, MinLength } from 'class-validator';

@InputType()
export class EditBookPartUser {

    // @Field(() => String)
    // @IsMongoId()
    // @IsNotEmpty()
    // // @Transform(toMongoObjectId)
    // idBook: string;

    @Field(() => String)
    @IsMongoId()
    @IsNotEmpty()
    // @Transform(toMongoObjectId)
    idpartBook: string;


    @Field(() => String,{nullable: true} )
    @IsOptional()
    @IsString()
    @MinLength(5)
    title:string;
  
    @Field(() => String,{nullable: true})
    @IsOptional()
    @IsString()
    content:string;

    @Field(() => Boolean, { defaultValue: true})
    @IsOptional()
    @IsBoolean()
    isPublished:boolean;

}
