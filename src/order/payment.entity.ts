import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity'; // Assuming Order entity exists

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  paymentMode: string;

  @Column({ nullable: true })
  Fidelity: string;

  @Column('float', { nullable: true }) // Use 'float' or 'double precision' instead of default type
  paymentAmount: number;

  @Column('jsonb', { nullable: true })
  data: { renderAmount: number };

  @Column('float',{ nullable: true }) // Use 'float' or 'double precision' instead of default type
  totalAmountDeposited: number;

  @ManyToOne(() => Order, (order) => order.reglements, { cascade: false })
  order: Order;
}
