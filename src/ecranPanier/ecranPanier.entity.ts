// src/ecran-panier/ecran-panier.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EcranPanier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false , nullable: true })
  affichageArticleScanne: boolean;

  @Column({ default: true , nullable: true  })
  imagePublicitaire: boolean;

  @Column({ default: false , nullable: true })
  logo: boolean;

  @Column({ nullable: true })
  uploadedImagePublicitaire: string;

  @Column({ nullable: true })
  uploadedLogo: string;
}
