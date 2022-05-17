import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Order } from "./order.entity";

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    name: string;

    @Column({
        type: 'varchar',
        default: 'NA'
    })
    brand: string;

    @Column({
        type: 'float'
    })
    price: number;

    @Column({
        type: 'boolean',
        default: true
    })
    isAvailable: boolean;

    @UpdateDateColumn()
    lastModified: Date;

    @CreateDateColumn()
    createdAt: Date;

    // @OneToMany(() => Cart, cart => cart.products)
    // cart: Cart
    // @OneToMany(() => Order, order => order.products)
    // order: Order[];
}
