import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/app.guards';
import { Roles } from 'src/entities/user.entity';

@Controller('product')
@UsePipes(ValidationPipe)
@SetMetadata('role', Roles.ADMIN)
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get('list/:page')
  async findAll(@Param('page') page: string) {
    return await this.productService.findAll(+page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return (await this.productService.remove(+id)).affected != 0
      ? 'Deleted Successfully'
      : new NotFoundException();
  }
}
