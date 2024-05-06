import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PromoCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  designation: string;

  @Column()
  totalNumberOfUse: number;

  // Autres colonnes...
}
