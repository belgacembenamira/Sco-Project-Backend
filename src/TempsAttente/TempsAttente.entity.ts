import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Assurez-vous que le décorateur @Entity est présent
export class TempsAttente {
  @PrimaryGeneratedColumn() // La clé primaire
  id: number;

  @Column() // Une colonne de type number
  tempsAffichage: number;

  @Column()
  tempsVeille: number;
}
