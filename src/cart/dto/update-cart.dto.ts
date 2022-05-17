import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
