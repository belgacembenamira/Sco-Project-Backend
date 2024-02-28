/* eslint-disable prettier/prettier */
/**
 * @description      :
 * @author           : belgacem
 * @group            :
 * @created          : 18/02/2024 - 23:13:43
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 18/02/2024
 * - Author          : belgacem
 * - Modification    :
 **/
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return await this.productsRepository.remove(product);
  }
  async findByQcCode(qcCode): Promise<Product[]> {
    return this.productsRepository.find({ where: { qcCode } });
  }
}
