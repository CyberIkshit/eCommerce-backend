import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { PaymentModes } from 'src/entities/order.entity';

export class CartCheckoutDto {
  @IsNotEmpty()
  @IsNumber()
  addressId: number;

  @IsNotEmpty()
  @IsEnum(PaymentModes)
  paymentMode: PaymentModes;
}
