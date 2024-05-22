import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity'; // Assuming Order entity exists

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  barCode: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  qty: number;

  @Column({ nullable: true })
  reduction: number;

  @Column({ nullable: true })
  remize: number;

  @Column({ nullable: true })
  fidelity: number;

  @Column('jsonb', { nullable: true })
  imageUrl: { Default: { urlDefault: string } };

  @Column('jsonb', { nullable: true })
  price: {
    advancedPrice: {
      [key: string]: {
        originalKeyElements: any;
        pricettc: number;
      };
    };
  };

  @ManyToOne(() => Order, (order) => order.lines, { cascade: false })
  order: Order;
}
