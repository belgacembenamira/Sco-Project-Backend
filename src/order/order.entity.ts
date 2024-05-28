import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity'; // Adjust the path based on your project structure
import { Payment } from './payment.entity'; // Adjust the path based on your project structure

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderOrigine: string;

  @Column()
  ipOrigine: string;

  @Column({ type: 'bigint' })
  horodatage: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Adjusted to decimal type
  totalttc: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true }) // Adjusted to decimal type
  ResteAPayer: number;

  @Column()
  deviseCode: string;

  @Column()
  clientPhoneNumber: string;

  @OneToMany(() => Product, (product) => product.order, { cascade: true })
  lines: Product[];

  @OneToMany(() => Payment, (payment) => payment.order, { cascade: true })
  reglements: Payment[];
  saleModeVatRates: any;
}
