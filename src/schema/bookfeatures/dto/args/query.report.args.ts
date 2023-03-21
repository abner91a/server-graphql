import { IsInt, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { Field, InputType, Int } from "@nestjs/graphql";



@InputType()
export class QueryReportArgs {

    @Field( ()=> Int  )
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    page:number


    @Field( ()=> Int  )
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    perPage:number

    @Field( ()=> String,{nullable: true}  )
    @IsOptional()
    @IsMongoId()
    reportId:string

    // @Field( ()=> Number, { nullable: true, description: '0 para desactivado y 1 activo'}  )
    // @IsOptional()
    // @IsPositive()
    // status:number

    
    // @Field( ()=> String  )
    // @IsString()
    // sort:string
}