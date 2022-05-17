import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

import { AddressRepository } from 'src/address/address.repository';

@Module({
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([OrderRepository, AddressRepository])],
})
export class OrderModule {}
