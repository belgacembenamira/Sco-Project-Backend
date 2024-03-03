/**
 * @description      :
 * @author           : belgacem
 * @group            :
 * @created          : 20/02/2024 - 11:21:14
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 20/02/2024
 * - Author          : belgacem
 * - Modification    :
 **/
import { Category } from 'src/categories/categories.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string; // Correspond au nom du produit

  @Column('decimal', { precision: 10, scale: 2 })
  prix: number; // Correspond au prix du produit


  @Column()
  url: string; // Correspond à l'URL du produit

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  remize: number | null; // Correspond à la remise appliquée au produit

  @Column({ name: 'qc_code', nullable: false, type: 'varchar' }) 
  qcCode: string; // Correspond au code QC du produit

  @ManyToOne(() => Category, category => category.products)
  category: Category;
}
