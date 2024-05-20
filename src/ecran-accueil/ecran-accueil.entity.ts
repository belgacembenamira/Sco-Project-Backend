import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EcranAccueil {
  @PrimaryGeneratedColumn()
  id: number; // Clé primaire auto-générée

  @Column({  nullable: true  })
  ecranPub: boolean; // Écran publicitaire

  @Column({ default: 'fr' })
  defaultLang: string; // Langue par défaut

  @Column({  nullable: true  })
  multiLang: boolean; // Support multilingue

  @Column({  nullable: true  })
  logoPub: boolean; // Affichage du logo

  @Column({ default: false })
  majuscule: boolean; // Utilisation des majuscules

  @Column({ nullable: true })
  uploadedImage: string | null; // Image téléchargée
  @Column({ nullable: true })
  logoPath: string | null; // lgogo

  @Column({ nullable: true })
  uploadedVideo: string | null; // Vidéo téléchargée
}
