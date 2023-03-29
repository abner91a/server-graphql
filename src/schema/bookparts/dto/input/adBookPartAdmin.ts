import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

@InputType()
export class AddBookPartAdmin {

    @Field(() => String)
    @IsMongoId()
    @IsNotEmpty()
    // @Transform(toMongoObjectId)
    idBook: string;


    @Field(() => String )
    @IsString()
    @MinLength(5)
    title:string;
  
    @Field(() => String)
    @IsString()
    content:string;

    @Field(() => Boolean, {defaultValue: false})
    @IsOptional()
    @IsBoolean()
    isActive:boolean;
}