import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  primaryColor: string;

  @Column({ nullable: true })
  secondaryColor: string;
}
