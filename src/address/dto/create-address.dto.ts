import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  address: string;

  address2: string;

  landmark: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  mobile: number;

  @IsNotEmpty()
  postalCode: number;
}
