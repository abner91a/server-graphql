import { Field, ObjectType } from '@nestjs/graphql';
import { Book } from '../entities/book.entity';




@ObjectType()
export class BookListResponse{

    @Field(()=> [Book])
    book: Book[] ;

    @Field(()=> Number)
    totalPagina: number ;
}