// src/ecran-panier/ecran-panier.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EcranPanier } from './ecranPanier.entity';
import { UpdateEcranPanierDto } from './UpdateEcranPanierDto';


@Injectable()
export class EcranPanierService {
  constructor(
    @InjectRepository(EcranPanier)
    private ecranPanierRepository: Repository<EcranPanier>,
  ) {}

  async findAll(): Promise<EcranPanier[]> {
    return this.ecranPanierRepository.find();
  }

  async findOne(id: number): Promise<EcranPanier> {
    return this.ecranPanierRepository.findOneBy({ id });
  }

  async create(ecranPanier: EcranPanier): Promise<EcranPanier> {
    return this.ecranPanierRepository.save(ecranPanier);
  }

  async update(id: number, updateEcranPanierDto: UpdateEcranPanierDto): Promise<void> {
    await this.ecranPanierRepository.update(id, updateEcranPanierDto);
  }

  async remove(id: number): Promise<void> {
    await this.ecranPanierRepository.delete(id);
  }
}
