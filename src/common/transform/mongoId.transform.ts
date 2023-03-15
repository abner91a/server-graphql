import { BadRequestException } from "@nestjs/common/exceptions";
import { isValidObjectId } from "mongoose";

export function toMongoObjectId({value,key}){
    // console.log(value,key)
    if(!isValidObjectId(value)){
        throw new BadRequestException(`${value}  `);
      }

      return value;
}