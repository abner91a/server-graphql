import { InputType, Int, Field } from '@nestjs/graphql';
import { IsMongoId, IsString } from 'class-validator';

@InputType()
export class ReportBookInput {

  @Field(() => String)
  @IsMongoId()
  bookId: string;

  @Field(() => String)
  @IsString()
  reason: string;

  @Field(() => String)
  @IsString()
  reasonDetails: string;
}
