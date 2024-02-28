/* eslint-disable prettier/prettier */
/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 18/02/2024 - 23:28:15
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/02/2024
    * - Author          : belgacem
    * - Modification    : 
**/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  ProductsService } from './product.service';
import { ProductsController } from './product.controller';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Assurez-vous d'importer le TypeOrmModule et de spécifier Product ici
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductModule {}
