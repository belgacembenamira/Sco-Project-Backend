import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  telcl: string;

  @Column({ nullable: true })
  nomcl: string;
  @Column({ nullable: true })
  numberCardfid: number;
  @Column({ nullable: true, name: 'montant_solde_compte_client' })
  montantSoldeCompteClient: number;
}
