import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, isString, IsString, MinLength } from 'class-validator';

@InputType()
export class EditBookPartAdmin {

    @Field(() => String)
    @IsMongoId()
    @IsNotEmpty()
    // @Transform(toMongoObjectId)
    id: string;


    @Field(() => String,{nullable: true} )
    @IsOptional()
    @IsString()
    @MinLength(5)
    title:string;
  
    @Field(() => String,{nullable: true})
    @IsOptional()
    @IsString()
    @MinLength(5)
    content:string;

    @Field(() => Boolean, {nullable: true})
    @IsOptional()
    @IsBoolean()
    isActive:boolean;

    @Field(() => Boolean, {nullable: true })
    @IsOptional()
    @IsBoolean()
    isApproved:boolean;

    @Field(() => Boolean, {nullable: true })
    @IsOptional()
    @IsBoolean()
    isPublished:boolean;
}
