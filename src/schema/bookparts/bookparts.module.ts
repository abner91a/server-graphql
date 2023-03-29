import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookpartsService } from './bookparts.service';

import { BookModule } from '../book/book.module';
import { Bookpart, Bookpartchema } from './entities/bookpart.entity';
import { BookpartsMutationResolver,BookpartsMutationAdminResolver } from './resolvers/mutation';
import { BookpartsQueryResolver } from './resolvers/query/bookPart.resolver.query';

@Module({
  providers: [BookpartsMutationResolver, BookpartsMutationAdminResolver,BookpartsQueryResolver, BookpartsService],
  imports: [
    MongooseModule.forFeature([{ name: Bookpart.name, schema: Bookpartchema }]),

    BookModule,
  ],
})
export class BookpartsModule {}
