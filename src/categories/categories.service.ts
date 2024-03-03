import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductsService } from '../product/product.service';


@Injectable()
export class CategoryService {
  ProductsService: any;
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(category);
  }
  async createProductWithProductsService(categoryId: number, productData: Partial<Product>): Promise<Product> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId }, relations: ['products'] });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Utilisation de la méthode create du ProductRepository pour créer un produit associé à la catégorie
    const product = this.productRepository.create({
      ...productData,
      category: category, // Associer le produit à la catégorie
    });
    return this.productRepository.save(product);
}


  async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id }, relations: ['products'] });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    Object.assign(category, categoryData);
    return this.categoryRepository.save(category);
  }

  async createProduct(categoryId: number, productData: Partial<Product>): Promise<Product> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId }, relations: ['products'] });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    const product = this.productRepository.create(productData);
    product.category = category;
    return this.productRepository.save(product);
  }

  async updateProduct(productId: number, productData: Partial<Product>): Promise<Product> {
    // Récupérer le produit par son ID
    const product = await this.productRepository.findOne({ where: { id: productId } });
  
    // Vérifier si le produit existe
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  
    // Appliquer les modifications aux propriétés du produit avec les données fournies
    Object.assign(product, productData);
  
    // Sauvegarder les modifications apportées au produit
    return this.productRepository.save(product);
  }
  
  



  async remove(id: number): Promise<void> {
    // Trouver la catégorie avec l'ID spécifié et charger ses produits associés
    const category = await this.categoryRepository.findOne({ where: { id }, relations: ['products'] });
  
    // Si la catégorie n'est pas trouvée, lancer une exception
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  
    // Supprimer tous les produits associés à cette catégorie
    await this.productRepository.delete({ category });
  
    // Ensuite, supprimer la catégorie elle-même
    await this.categoryRepository.delete(id);
  }
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id }, relations: ['products'] });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }
  
}