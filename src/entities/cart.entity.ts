import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('cart')
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'float',
  })
  total: number;

  @UpdateDateColumn()
  lastModified: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
