import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ModeReglement {
  @PrimaryGeneratedColumn()
  id: number; // ID unique de l'entité

  @Column({ nullable: true })
  isEspChecked: boolean; // Indique si Espèce est activé

  @Column({nullable: true  })
  isComptChecked: boolean; // Indique si Au Comptoir est activé

  @Column({nullable: true  })
  isCarteChecked: boolean; // Indique si Carte Bancaire est activé

  @Column({ type: 'varchar', nullable: true })
  iconEsp: string; // URL de l'icône pour Espèce

  @Column({ type: 'varchar', nullable: true })
  iconCompt: string; // URL de l'icône pour Au Comptoir

  @Column({ type: 'varchar', nullable: true })
  iconCarte: string; // URL de l'icône pour Carte Bancaire
}
