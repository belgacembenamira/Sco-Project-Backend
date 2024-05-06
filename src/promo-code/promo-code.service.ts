import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PromoCodeEntity } from './promo-code.entity';

@Injectable()
export class PromoCodeService {
  constructor(
    @InjectRepository(PromoCodeEntity)
    private promoCodeRepository: Repository<PromoCodeEntity>,
  ) {}

  async findAll(): Promise<PromoCodeEntity[]> {
    return this.promoCodeRepository.find();
  }

  async findOneByDesignation(
    designation: string,
  ): Promise<PromoCodeEntity | undefined> {
    return this.promoCodeRepository.findOne({ where: { designation } });
  }

  async create(promoCodeData: PromoCodeEntity): Promise<PromoCodeEntity> {
    const newPromoCode = this.promoCodeRepository.create(promoCodeData);
    return this.promoCodeRepository.save(newPromoCode);
  }

  async findOne(id: number): Promise<PromoCodeEntity | undefined> {
    return this.promoCodeRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updatePromoCodeDto: Partial<PromoCodeEntity>,
  ): Promise<PromoCodeEntity | undefined> {
    const promoCode = await this.findOne(id);
    if (!promoCode) {
      return undefined;
    }

    Object.assign(promoCode, updatePromoCodeDto);
    return this.promoCodeRepository.save(promoCode);
  }

  async remove(id: number): Promise<void> {
    await this.promoCodeRepository.delete(id);
  }

  async updateByDesignation(
    designation: string,
    promoCodeData: PromoCodeEntity,
  ): Promise<PromoCodeEntity> {
    const existingPromoCode = await this.promoCodeRepository.findOne({
      where: { designation },
    });

    if (!existingPromoCode) {
      throw new Error('Code promo non trouvé');
    }

    existingPromoCode.totalNumberOfUse -= 1; // Décrémenter la valeur de totalNumberOfUse

    // Supprimer l'entité si totalNumberOfUse est égal à 0
    // if (existingPromoCode.totalNumberOfUse === 0) {
    //   await this.promoCodeRepository.remove(existingPromoCode);
    //   return null; // Retourner null car l'entité est supprimée
    // }

    existingPromoCode.designation = promoCodeData.designation;

    return this.promoCodeRepository.save(existingPromoCode);
  }
  async removeByDesignation(designation: string): Promise<void> {
    const existingPromoCode = await this.promoCodeRepository.findOne({
      where: { designation },
    });

    if (!existingPromoCode) {
      throw new NotFoundException('Code promo non trouvé');
    }

    await this.promoCodeRepository.remove(existingPromoCode);
  }
}
