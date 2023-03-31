import { Query } from '@nestjs/graphql';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserInput } from './dto/input';
import { User } from './entities/user.entity';
import { UserFilterException } from 'src/common/filters/user.filter';

import { UserAllQueryArgs } from './dto/args';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { QueryUserAdminArgs } from 'src/common/dto/args/queryUserAdmin.args';
import { UserResponse } from './type/userResponse';
import { BookService } from '../book/book.service';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger('UserService');

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    // private readonly bookService: BookService,

  ) {}

  /*   ADMIN PANEL  */

  // async findAllUserByadmin(query: UserAllQueryArgs): Promise<User[]> {
  //   const { search, page, perPage } = query;
  //   const skip = (page - 1) * perPage;
  //   const limit = perPage;

  //   const users = await this.userModel
  //     .find({
  //       $or: [
  //         { name: { $regex: search, $options: 'i' } },
  //         { email: { $regex: search, $options: 'i' } },
  //       ],
  //     })
  //     .skip(skip)
  //     .limit(limit)
  //     .exec();

  //   return users;
  // }

  async findAllUserByadmin(queryUser: QueryUserAdminArgs):Promise<UserResponse> {
    const { page, perPage, isActive, search } = queryUser;
    const skip = (page - 1) * perPage;
    const limit = perPage;

    let matchData = {};


    if (search) {
      matchData = {
        $or: [
          { roles: { $regex: `^.*${search}.*`, $options: 'si' } },
          { email: { $regex: `^.*${search}.*`, $options: 'si' } },
          { fullname: { $regex: `^.*${search}.*`, $options: 'si' } },
        ],
      };
    } else {
      matchData = {
        isActive,
      };
    }

    const user = await this.userModel.aggregate([
      { $match: matchData },
      { $skip: skip },
      { $limit: limit },
    ]);

    if(!user.length) throw new BadRequestException('No hay una siguiente lista');

    const totalCount = await this.userModel.countDocuments(matchData);
    const totalPagina = Math.ceil(totalCount / perPage);

    return {
      user,
      totalPagina
    };
  }

  async findUserById(id:string):Promise<User>{
    const user = await this.userModel.findById(id);

    if(!user) throw new BadRequestException('No existe el usuario');

    return user;
  }

  /*   USUARIO  */

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

  async findAllUser(query: UserAllQueryArgs): Promise<User[]> {
    const { search, page, perPage } = query;

    let matchData = {};

    if (search) {
      matchData = {
        $or: [
          { roles: { $regex: `^.*${search}.*`, $options: 'si' } },
          { email: { $regex: `^.*${search}.*`, $options: 'si' } },
        ],
      };
    } else {
      matchData = {
        $or: [
          { roles: { $regex: `^.*${search}.*`, $options: 'si' } },
          { email: { $regex: `^.*${search}.*`, $options: 'si' } },
        ],
      };
    }

    // const user = await this.userModel.find({});

    const user = await this.userModel.aggregate([
      { $match: matchData },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
    ]);

    return user;
  }
}
