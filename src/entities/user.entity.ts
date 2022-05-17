import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

export enum Roles {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CSTMR',
  EMPLOYEE = 'EMP',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
  })
  firstName: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  middleName: string;

  @Column({
    type: 'varchar',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  mobile: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;
  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.CUSTOMER,
  })
  role: Roles;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];
}
