import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';

import { BookModule } from '../book/book.module';
import { Bookpart, Bookpartchema } from './entities/bookpart.entity';
import {
  BookpartsMutationUserResolver,
  BookpartsMutationAdminResolver,
} from './resolvers/mutation';
import { BookpartsQueryAdminResolver } from './resolvers/query';
import { BookpartsService } from './bookparts.service';

@Module({
  providers: [
    BookpartsMutationUserResolver,
    BookpartsMutationAdminResolver,
    BookpartsQueryAdminResolver,
    BookpartsService,
  ],
  exports: [BookpartsService],
  imports: [
    MongooseModule.forFeature([{ name: Bookpart.name, schema: Bookpartchema }]),

    forwardRef(() => BookModule),
    // BookModule,

  ],

})
export class BookpartsModule {}
