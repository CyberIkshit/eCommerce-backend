import {
  BadRequestException,
  HttpException,
  Injectable,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles, User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.confirmPassword)
      return {
        message: 'Password and confirm password are not same',
      };
    return await this.userRepo.save(createUserDto);
  }

  logout(@Session() session: Record<string, any>) {
    if (session.userId) {
      session.destroy();
      return {
        message: 'Success',
      };
    } else
      return {
        message: 'Already logged out',
      };
  }

  async login(
    loginUserDto: LoginUserDto,
    @Session() session: Record<string, any>,
  ) {
    if (session.userId) {
      return {
        message: 'Already logged in, logout before logging in again',
      };
    }
    try {
      const user = await this.userRepo.findOneOrFail({
        username: loginUserDto.username,
      });
      if (user.password === loginUserDto.password) {
        session.userId = user.id;
        if (user.role == Roles.ADMIN) {
          session.isAdmin = true;
        } else {
          session.isAdmin = false;
        }
        return {
          message: `Logged in as ${user.firstName + ' ' + user.lastName}`,
        };
      } else return new UnauthorizedException('Incorrect Password');
    } catch (error) {
      return new UnauthorizedException();
    }
  }
}
