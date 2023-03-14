import { Injectable, Logger, BadRequestException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserInput } from './dto/input';
import { User } from './entities/user.entity';
import { UserFilterException } from 'src/common/filters/user.filter';
import { GraphQLError } from 'graphql';

export class LegallyUnavailableError extends Error {
  code = 451;
  message = this.message || 'This content is not available in your country';
}

@Injectable()
export class UsersService {
  private logger: Logger = new Logger('UserService');

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async addUser(addUser: CreateUserInput) {
    try {
      const user = await this.userModel.create({
        _id: new mongoose.Types.ObjectId(),
        ...addUser,
        password: bcrypt.hashSync(addUser.password, 10),
      });
      return user;
    } catch (error) {
      throw new BadRequestException('Existe la cuenta favor de usar otra', {
        description: 'Some error description',
      });
    }
  }

  async findOneByUserId(id: string): Promise<User> {
    const userId = await this.userModel.findById(id);

    if (!userId) {
      // UserFilterException.prototype.handlerDBError(error, 11000);
      throw new BadRequestException('Errror en la cuenta');
    }

    return userId;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email.toLowerCase() });

    if (!user) UserFilterException.prototype.handlerDBError(null, 1);

    return user;
  }
}
