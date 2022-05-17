import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Product } from './product.entity';
import { User } from './user.entity';
export enum OrderStatus {
  CONFIRMED = 'CONFIRMED',
  PENDING = 'PENDING',
}
export enum PaymentModes {
  CARD = 'CARD',
  NETBANKING = 'NETBANKING',
  EMI = 'EMI',
  COD = 'COD',
}
@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Column({
    type: 'float',
  })
  amount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({
    type: 'simple-array',
  })
  items: string;

  @Column({
    type: 'enum',
    enum: PaymentModes,
    default: PaymentModes.COD,
  })
  paymentMode: PaymentModes;

  @UpdateDateColumn()
  lastModified: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
