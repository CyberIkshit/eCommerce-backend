import { Controller, Get, Param, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/app.guards';
import { CartService } from 'src/cart/cart.service';
import { Roles } from 'src/entities/user.entity';

@Controller('payment')
@SetMetadata('role', Roles.CUSTOMER)
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  async makePayment(@Param('id') id: string) {
    return await this.cartService.makePayment(+id);
  }
}
