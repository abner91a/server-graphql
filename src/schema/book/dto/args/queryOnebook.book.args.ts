import { IsInt, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { Field, InputType, Int } from "@nestjs/graphql";



@InputType()
export class QueryArgsBook {

    @Field( ()=> String  )
    @IsMongoId()
    idNovel:string

 
    

}