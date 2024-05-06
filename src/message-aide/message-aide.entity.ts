import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageAide {
  @PrimaryGeneratedColumn() // Définit une colonne de clé primaire générée automatiquement
  id: number;

  @Column({ nullable: true }) // Déclare une colonne dans la table
  isMessageHelp: boolean;

  @Column({ nullable: true })
  isAlertSound: boolean;

  @Column({ nullable: true })
  isServerChecked: boolean;

  @Column({ nullable: true })
  borneNumber: string;

  @Column({ nullable: true })
  location: string;
}
