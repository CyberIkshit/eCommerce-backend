import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { UserRepository } from 'src/user/user.repository';
import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressRepository) private addressRepo: AddressRepository,
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}

  async create(
    createAddressDto: CreateAddressDto,
    session: Record<string, any>,
  ) {
    try {
      const user = await this.userRepo.findOneOrFail({ id: session.userId });

      return await this.addressRepo.save({ ...createAddressDto, user: user });
    } catch (error) {
      return new NotFoundException('User not found');
    }
  }

  async findAll(session: Record<string, any>) {
    try {
      const user = await this.userRepo.findOneOrFail({ id: session.userId });

      return await this.addressRepo.find({ user: user });
    } catch (error) {
      return new NotFoundException('User not found');
    }
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      return await this.addressRepo.save({ id: id, ...updateAddressDto });
    } catch (error) {
      return new NotFoundException('Address not found');
    }
  }

  async remove(id: number) {
    try {
      return await this.addressRepo.delete({ id: id });
    } catch (error) {
      return new NotFoundException('Address not found');
    }
  }
}
