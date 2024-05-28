// src/client/entities/client.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  telcl: string;

  @Column({ nullable: true })
  nomcl: string;

  @Column({ nullable: true })
  numberCardfid: string;

  @Column({ default: 0, nullable: true })
  montantSoldeCompteClient: number;
}
