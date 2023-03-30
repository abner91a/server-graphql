import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsMongoId, IsOptional, IsPositive, Min } from 'class-validator';


@ArgsType()
export class QueryBookChapterAdminArgs {


    @Field( ()=> String  )
    @IsMongoId()
    bookId:string
    
}