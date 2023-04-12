import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';
import { UsersResolverQueryAdmin } from './resolver';
import { UserBookModule } from 'src/services-global/user-book/user-book.module';
import { UserBookService } from 'src/services-global/user-book/user-book.service';




@Module({
  providers: [UsersResolverQueryAdmin, UsersService],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    // UserBookModule
  ],
})
export class UsersModule {}
