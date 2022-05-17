import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  UsePipes,
  ValidationPipe,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/app.guards';
import { Roles } from 'src/entities/user.entity';
import { CartService } from './cart.service';
import { CartCheckoutDto } from './dto/cart-checkout.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
@UsePipes(ValidationPipe)
@SetMetadata('role', Roles.CUSTOMER)
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async showCart(@Session() session: Record<string, any>) {
    return await this.cartService.getCartItems(session);
  }

  @Patch()
  async update(
    @Body() updateCartDto: UpdateCartDto,
    @Session() session: Record<string, any>,
  ) {
    return await this.cartService.update(updateCartDto, session);
  }

  @Post('checkout')
  async checkout(
    @Body() cartCheckOutDto: CartCheckoutDto,
    @Session() session: Record<string, any>,
  ) {
    return await this.cartService.cartCheckout(cartCheckOutDto, session);
  }

  @Delete(':id')
  async removeItemFromCart(
    @Param('id') id: string,
    @Session() session: Record<string, any>,
  ) {
    return await this.cartService.remove(+id, session);
  }
}
