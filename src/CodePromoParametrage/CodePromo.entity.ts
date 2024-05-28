import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CodePromoParametrage')
export class CodePromoParametrage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  isActive: boolean;

  @Column({ nullable: true })
  promoAuthEnabled: boolean;
}
