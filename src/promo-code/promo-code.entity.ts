import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('promo_code')
export class PromoCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  designation: string;

  @Column({ type: 'int', nullable: true })
  value: number;

  @Column({ type: 'int', nullable: true })
  totalNumberOfUse: number;

  @Column({ type: 'int', nullable: true })
  leftToUse: number;

  @Column({ type: 'timestamp', nullable: true })
  offerDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  offerValidity: Date;

  @Column({ length: 100, nullable: true })
  uuidShop: string;

  @Column({ length: 100, nullable: true })
  uuidFranchise: string;

  @Column({ length: 100, nullable: true })
  franchiseName: string;
}
