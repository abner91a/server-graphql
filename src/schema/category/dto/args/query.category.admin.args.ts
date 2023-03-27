import { IsBoolean, IsInt, IsNotEmpty,  IsOptional,  IsPositive } from 'class-validator';
import { Field, InputType, Int } from "@nestjs/graphql";



@InputType()
export class QueryCategoryAdminArgs {

    @Field( ()=> Int, { defaultValue: 1} )
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    page:number


    @Field( ()=> Int, { defaultValue: 1} )
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    perPage:number

    @Field( ()=> Boolean, { nullable: true} )
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean

    // @Field( ()=> String  )
    // @IsMongoId()
    // categoryId:string


}