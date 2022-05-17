import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    OrderModule,
    UserModule,
    CartModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
