import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AddressRepository } from 'src/address/address.repository';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserRepository, AddressRepository])],
  providers: [UserService],
})
export class UserModule {}
