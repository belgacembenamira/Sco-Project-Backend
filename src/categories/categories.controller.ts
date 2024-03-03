import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Category } from './categories.entity';
import { CategoryService } from './categories.service';
import { Product } from 'src/product/entities/product.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findOne(+id);
  }

  @Post()
  async create(@Body() categoryData: { category: Partial<Category>, product: Partial<Product> }): Promise<Category> {
    const { category, product } = categoryData;
    // Créer d'abord la catégorie
    const createdCategory = await this.categoryService.createCategory(category);
    // Ensuite, créer le produit associé à la catégorie
    const createdProduct = await this.categoryService.createProductWithProductsService(createdCategory.id, product);
    return createdCategory;
  }
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() categoryData: Partial<Category>): Promise<Category> {
    return await this.categoryService.updateCategory(+id, categoryData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.categoryService.remove(+id);
  }
}
