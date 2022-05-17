import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartRepository } from './cart.repository';
import { UserRepository } from 'src/user/user.repository';
import { ProductRepository } from 'src/product/product.repository';
import { OrderRepository } from 'src/order/order.repository';
import { AddressRepository } from 'src/address/address.repository';
import { PaymentController } from 'src/payment/payment.controller';

@Module({
  controllers: [CartController, PaymentController],
  providers: [CartService],
  imports: [
    TypeOrmModule.forFeature([
      CartRepository,
      UserRepository,
      ProductRepository,
      OrderRepository,
      AddressRepository,
    ]),
  ],
})
export class CartModule {}
