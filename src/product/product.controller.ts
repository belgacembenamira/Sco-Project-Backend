/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 18/02/2024 - 23:21:42
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/02/2024
    * - Author          : belgacem
    * - Modification    : 
**/
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.ProductsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.ProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.ProductsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ProductsService.remove(+id);
  }
  @Get('qc/:qcCode')
  findByQcCode(@Param('qcCode') qcCode: string) {
    return this.ProductsService.findByQcCode(qcCode); // No need to convert to number
  }
}
