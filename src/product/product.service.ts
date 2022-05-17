import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductRepository) private productRepositry: ProductRepository) { }
  async create(createProductDto: CreateProductDto) {
    return await this.productRepositry.save(createProductDto);
  }

  async findAll(page: number) {
    if (page < 1)
      return new BadRequestException();
    return await this.productRepositry.find({ take: 20, skip: (page - 1) * 20 });
  }

  async findOne(id: number) {
    try {
      return await this.productRepositry.findOneOrFail({ 'id': id });
    } catch (error) {
      return new NotFoundException();
    }

  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepositry.save({
      'id': id,
      'name': updateProductDto.name,
      'brand': updateProductDto.brand,
      'price': updateProductDto.price,
      'isAvailable': updateProductDto.isAvailable
    });
  }

  async remove(id: number) {
    return await this.productRepositry.delete({ 'id': id });
  }
}
