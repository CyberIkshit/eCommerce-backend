import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity('addresses')
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  firstName: string;
  @Column({ type: 'varchar', length: 20 })
  lastName: string;

  @Column({ type: 'varchar', length: 50 })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  address2: string;

  @Column({ type: 'varchar', length: 50 })
  landmark: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 50 })
  state: string;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column({ type: 'int' })
  postalCode: number;

  @Column({
    type: 'varchar',
  })
  mobile: number;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @UpdateDateColumn()
  lastModified: Date;

  @CreateDateColumn()
  createdAt: Date;
}
