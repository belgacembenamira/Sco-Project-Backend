import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodePromoParametrage } from './CodePromo.entity';

@Injectable()
export class CodePromoParametrageService {
  constructor(
    @InjectRepository(CodePromoParametrage)
    private promoCodeRepository: Repository<CodePromoParametrage>,
  ) {}

  findAll(): Promise<CodePromoParametrage[]> {
    return this.promoCodeRepository.find();
  }

  findOne(id: number): Promise<CodePromoParametrage> {
    return this.promoCodeRepository.findOne({ where: { id } });
  }

  async create(
    promoCode: Partial<CodePromoParametrage>,
  ): Promise<CodePromoParametrage> {
    const newPromoCode = this.promoCodeRepository.create(promoCode);
    return this.promoCodeRepository.save(newPromoCode);
  }

  async update(
    id: number,
    updateData: Partial<CodePromoParametrage>,
  ): Promise<CodePromoParametrage> {
    await this.promoCodeRepository.update(id, updateData);
    return this.findOne(id);
  }

  async findWithConditions(
    conditions: Partial<CodePromoParametrage>,
  ): Promise<CodePromoParametrage[]> {
    return this.promoCodeRepository.find({ where: conditions });
  }
}
