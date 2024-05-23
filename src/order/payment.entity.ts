import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity'; // Assuming Order entity exists

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column()
  paymentMode: string;
  @Column({ nullable: true })
  Fidelity: string;

  @Column()
  paymentAmount: number;

  @Column('jsonb')
  data: { renderAmount: number };

  @Column()
  totalAmountDeposited: number;

  @ManyToOne(() => Order, (order) => order.reglements, { cascade: false })
  order: Order;
}
