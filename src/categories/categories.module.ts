import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { CategoryController } from './categories.controller';
import { Category } from './categories.entity';
import { CategoryService } from './categories.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product]), // Assurez-vous d'importer Product ici
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
