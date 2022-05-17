import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import session from 'express-session';
import { AddressRepository } from 'src/address/address.repository';
import { Cart } from 'src/entities/cart.entity';
import { OrderStatus, PaymentModes } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { OrderRepository } from 'src/order/order.repository';
import { ProductRepository } from 'src/product/product.repository';
import { UserRepository } from 'src/user/user.repository';
import { CartRepository } from './cart.repository';
import { CartCheckoutDto } from './dto/cart-checkout.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartRepository) private cartRepo: CartRepository,
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(ProductRepository)
    private productRepositry: ProductRepository,
    @InjectRepository(OrderRepository) private orderRepo: OrderRepository,
    @InjectRepository(AddressRepository) private addressRepo: AddressRepository,
  ) {}
  async create(userId: number, product: Product) {
    const cart = new Cart();
    cart.products = [product];
    cart.total = product.price;
    const user = await this.userRepo.findOne({ id: userId });

    const resultantCart = await this.cartRepo.save(cart);
    user.cart = resultantCart;
    await this.userRepo.save(user);
    return resultantCart;
  }
  async getCartItems(session: Record<string, any>) {
    try {
      const cartId = (
        await this.userRepo.findOne(
          { id: session.userId },
          { relations: ['cart'] },
        )
      ).cart.id;
      if (cartId)
        return await this.cartRepo.findOne(
          { id: cartId },
          { relations: ['products'] },
        );
    } catch (e) {
      return new NotFoundException('Cart Empty');
    }
  }
  async update(updateCartDto: UpdateCartDto, session: Record<string, any>) {
    let product: Product;
    try {
      product = await this.productRepositry.findOneOrFail({
        id: updateCartDto.productId,
      });
    } catch (error) {
      return new NotFoundException('Product not found in product catalog');
    }
    const cartFromUser = (
      await this.userRepo.findOne(
        { id: session.userId },
        { relations: ['cart'] },
      )
    ).cart;

    if (cartFromUser) {
      const cart = await this.cartRepo.findOne(
        { id: cartFromUser.id },
        { relations: ['products'] },
      );
      cart.products = [product, ...cart.products];
      cart.total = cart.total + product.price;
      return await this.cartRepo.save(cart);
    } else {
      return await this.create(session.userId, product);
    }
  }

  async remove(id: number, session: Record<string, any>) {
    try {
      const cartId = (
        await this.userRepo.findOne(
          { id: session.userId },
          { relations: ['cart'] },
        )
      ).cart.id;

      const cart = await this.cartRepo.findOne(
        { id: cartId },
        { relations: ['products'] },
      );
      const index = cart.products.findIndex((prod) => prod.id == id);
      if (index >= 0 && index < cart.products.length)
        cart.products.splice(index, 1);
      else return new BadRequestException('Product not found in cart');
      return await this.cartRepo.save(cart);
    } catch (e) {
      return new BadRequestException('Cart Empty');
    }
  }

  async cartCheckout(
    cartCheckOutDto: CartCheckoutDto,
    session: Record<string, any>,
  ) {
    try {
      const user = await this.userRepo.findOneOrFail(
        { id: session.userId },
        { relations: ['cart'] },
      );
      const cartId = user.cart.id;
      if (!cartId) return new NotFoundException('Cart Empty');

      let cart = await this.cartRepo.findOne(
        { id: cartId },
        { relations: ['products'] },
      );
      if (cart.products.length == 0) {
        return new NotFoundException('Cart Empty');
      }
      let address = await this.addressRepo.findOne({
        id: cartCheckOutDto.addressId,
      });
      let status = OrderStatus.PENDING;
      let items = JSON.stringify(cart.products);
      if (cartCheckOutDto.paymentMode === PaymentModes.COD)
        status = OrderStatus.CONFIRMED;
      let amount = cart.total;

      cart.products.splice(0, cart.products.length);
      cart.total = 0;
      await this.cartRepo.save(cart);
      return await this.orderRepo.save({
        name: address.firstName + ' ' + address.lastName,
        address: address,
        amount: amount,
        status: status,
        paymentMode: cartCheckOutDto.paymentMode,
        items: items,
        user: user,
      });
    } catch (error) {
      console.log(error);
      return new NotFoundException('User not found');
    }
  }

  async makePayment(id: number) {
    try {
      let order = await this.orderRepo.findOneOrFail({ id: id });
      if (order.status === OrderStatus.CONFIRMED) {
        return new BadRequestException('Payment already done!!');
      }
      order.status = OrderStatus.CONFIRMED;
      return await this.orderRepo.save(order);
    } catch (error) {
      return new NotFoundException('Order not found');
    }
  }
}
