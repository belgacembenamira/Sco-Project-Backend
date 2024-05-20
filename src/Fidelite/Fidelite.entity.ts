import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fidelite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  isFidelityEnabled: boolean;

  @Column({ nullable: true })
  iconUrl: string;

  @Column({ nullable: true })
  isCardAuthEnabled: boolean;

  @Column({ nullable: true })
  isCodeEntryRequired: boolean;

  @Column({ nullable: true })
  isPhoneAuthEnabled: boolean;
}
