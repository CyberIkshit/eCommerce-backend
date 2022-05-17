import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  providers: [ProductService]
})
export class ProductModule { }
