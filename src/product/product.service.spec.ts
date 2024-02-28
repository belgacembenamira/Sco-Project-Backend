/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 18/02/2024 - 23:31:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/02/2024
    * - Author          : belgacem
    * - Modification    : 
**/
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './product.service';
import { describe, beforeEach, it } from 'node:test';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
