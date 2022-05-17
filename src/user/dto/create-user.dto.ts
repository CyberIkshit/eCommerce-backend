import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Roles } from "src/entities/user.entity";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    firstName: string;

    middleName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    mobile: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirmPassword: string;

    @IsEnum(Roles)
    role: Roles;
}
