import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsPositive, Min, IsBoolean, IsNotEmpty } from 'class-validator';


@ArgsType()
export class QueryUserAdminArgs {

    
    @Field( ()=> Int, { nullable: true, defaultValue: 1} )
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Min(1)
    page:number


    @Field( ()=> Int, { nullable: true, defaultValue: 1}  )
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Min(1)
    perPage:number

    @Field( ()=> Boolean, { defaultValue: true} )
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isActive?: boolean

    @Field( ()=> String, { nullable: true} )
    @IsOptional()
    @IsNotEmpty()
    search?: string

    // @Field( ()=> Int, {defaultValue: 1}  )
    // @IsOptional()
    // @IsInt()
    // @IsPositive()
    // @Min(1)
    // perPage:number
    
}

