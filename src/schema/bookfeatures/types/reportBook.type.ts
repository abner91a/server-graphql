import { Field, ObjectType } from '@nestjs/graphql';
import { ReportBook } from '../entities/reportBook.entity';





@ObjectType()
export class ReportListResponse{

    @Field(()=> [ReportBook])
    reportBook: ReportBook[] ;

    @Field(()=> Number)
    totalPagina: number ;
}