// category.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Category } from './categories.entity';
import { CategoryService } from './categories.service';


@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(+id);
  }

  @Post()
  create(@Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoryService.create(categoryData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoryService.update(+id, categoryData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(+id);
  }
}
