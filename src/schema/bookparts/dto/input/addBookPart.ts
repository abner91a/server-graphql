import { InputType, Int, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class AddBookPart {

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
}
