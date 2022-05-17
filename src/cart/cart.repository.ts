import { Cart } from "src/entities/cart.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart>{ }