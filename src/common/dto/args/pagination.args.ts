import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';


@ArgsType()
export class PaginationArgs {

    @Field( ()=> Int )
    @IsOptional()
    @IsInt()
    page?:number


    @Field( ()=> Int )
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Min(1)
    perPage?:number
    
}