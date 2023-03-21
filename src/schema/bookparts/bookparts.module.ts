import { Module } from '@nestjs/common';
import { BookpartsService } from './bookparts.service';
import { BookpartsResolver } from './bookparts.resolver';

@Module({
  providers: [BookpartsResolver, BookpartsService]
})
export class BookpartsModule {}
