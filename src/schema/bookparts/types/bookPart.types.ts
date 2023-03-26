import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Book } from 'src/schema/book/entities/book.entity';
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

@ObjectType()
export class readBookListReadResponse{

    // @Field(()=> Number)
    // totalPagina: number ;

    @Field(()=> Book, {nullable:true})
    book: Book ;


    @Field(()=> [Bookpart], {nullable: true})
    bookPart: Bookpart[] ;

     @Field(()=> Number, {nullable: true})
    sigPage: number ;

    @Field(()=> Number, {nullable: true, defaultValue: 0})
    anteriorPage: number ;

    
    // @Field(()=> Number)
    // totalChapter: number ;
}