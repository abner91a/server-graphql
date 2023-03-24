import { IsInt, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { Field, InputType, Int } from "@nestjs/graphql";



@InputType()
export class QueryBookPartArgs {

    @Field( ()=> String  )
    @IsMongoId()
    bookId:string

    // @Field( ()=> String  )
    // @IsMongoId()
    // bookChapterId:string

    @Field( ()=> Int, {defaultValue: 1}  )
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    page:number


    @Field( ()=> Int , {defaultValue: 1} )
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    perPage:number

    // @Field( ()=> String  )
    // @IsMongoId()
    // categoryId:string

    // @Field( ()=> String, { nullable: true, description: 'views,avgRating'}  )
    // @IsOptional()
    // sort:string

    
    // @Field( ()=> String  )
    // @IsString()
    // sort:string
}