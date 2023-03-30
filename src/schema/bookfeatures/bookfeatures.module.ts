import { ReportBook, ReportBookchema } from './entities/reportBook.entity';
import { Module } from '@nestjs/common';
import { BookfeaturesService } from './bookfeatures.service';
// import { BookfeaturesResolver } from './bookfeatures.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportBookMutation } from './resolver/mutation/reportBook.resolver.mutation';
import { BookModule } from '../book/book.module';
import { BookQueryResolver } from './resolver/query/reportBook.resolver.query';
// import { BookpartsModule } from '../bookparts/bookparts.module';

@Module({
  providers: [ReportBookMutation,BookQueryResolver, BookfeaturesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: ReportBook.name,
        schema: ReportBookchema
      }
    ]),
    BookModule,
    // BookpartsModule
  ]
})
export class BookfeaturesModule {}
