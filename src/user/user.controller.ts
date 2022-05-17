import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Session() session: Record<string, any>) {
    return await this.userService.login(loginUserDto, session);
  }

  @Get('logout')
  logout(@Session() session: Record<string, any>) {
    return this.userService.logout(session);
  }
}
