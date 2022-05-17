import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from './address.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [TypeOrmModule.forFeature([AddressRepository, UserRepository])],
})
export class AddressModule {}
