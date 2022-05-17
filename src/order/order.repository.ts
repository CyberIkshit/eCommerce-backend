import { Order } from "src/entities/order.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order>{ }