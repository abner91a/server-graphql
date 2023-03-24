import { Field, ObjectType } from '@nestjs/graphql';
import { Bookpart } from '../entities/bookpart.entity';




@ObjectType()
export class BookListReadResponse{

    @Field(()=> [Bookpart])
    bookPart: Bookpart[] ;

    @Field(()=> Number)
    totalPagina: number ;
}

@ObjectType()
export class getAllBookListReadResponse{

    @Field(()=> [Bookpart])
    bookPart: Bookpart[] ;

    

}