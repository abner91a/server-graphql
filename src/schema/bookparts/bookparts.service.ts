import { Injectable } from '@nestjs/common';
import { CreateBookpartInput } from './dto/create-bookpart.input';
import { AddBookPart } from './dto/input';
import { UpdateBookpartInput } from './dto/update-bookpart.input';

@Injectable()
export class BookpartsService {
  create(addBookPart: AddBookPart) {
    return 'This action adds a new bookpart';
  }

  // findAll() {
  //   return `This action returns all bookparts`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} bookpart`;
  // }

  // update(id: number, updateBookpartInput: UpdateBookpartInput) {
  //   return `This action updates a #${id} bookpart`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} bookpart`;
  // }
}
