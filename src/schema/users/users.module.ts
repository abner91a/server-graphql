import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';


@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema 
      }
    ])
  ],
})
export class UsersModule {}
