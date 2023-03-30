import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsMongoId, IsOptional, IsPositive, Min } from 'class-validator';


@ArgsType()
export class QueryBookAdminArgs {

    // @Field( ()=> Int, { nullable: true, defaultValue: 1}  )
    // @IsOptional()
    // @IsInt()
    // @IsPositive()
    // page:number


    // @Field( ()=> Int, {nullable: true, defaultValue: 1}  )
    // @IsOptional()
    // @IsInt()
    // @IsPositive()
    // @Min(1)
    // perPage:number

    @Field( ()=> String  )
    @IsMongoId()
    bookId:string
    
}