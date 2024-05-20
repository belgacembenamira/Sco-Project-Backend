import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Indique à TypeORM que c'est une entité de base de données
export class Manager {
  @PrimaryGeneratedColumn() // Génère automatiquement l'ID
  id: number;

  @Column({nullable: true }) // Colonne pour l'état booléen
  isChecked: boolean;

  @Column({ nullable: true }) // Colonne pour l'URL du fichier
  fileUrl: string | null;
}
