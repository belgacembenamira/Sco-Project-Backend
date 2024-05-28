// code-postal.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('code_postal_manager')
export class CodePostalmanager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isCodeCheckEnabled: boolean;

  @Column({ default: true })
  isCodeEntryRequired: boolean;

  @Column({ default: true })
  isCodePostal: boolean;
}
