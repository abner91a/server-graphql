import { InputType, Int, Field } from '@nestjs/graphql';
import { IsIn, IsInt, IsMongoId, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class UpdateReportBookInput  {

  @Field(() => String)
  @IsMongoId()
  id: string


  @Field(() => Number,{nullable: true})
  @IsOptional()
  @IsInt()
  @IsPositive()
  borrarReporteBD: number

  @Field(() => Number,{nullable: true})
  @IsOptional()
  @IsInt()
  @IsPositive()
  desactivarReporte: number
}
