import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModeReglement } from './ModeReglement.entity';

@Injectable()
export class ModeReglementService {
  constructor(
    @InjectRepository(ModeReglement)
    private readonly modeReglementRepository: Repository<ModeReglement>,
  ) {}

  // Obtenir tous les modes de règlement
  async getAllModes(): Promise<ModeReglement[]> {
    return this.modeReglementRepository.find();
  }

  // Obtenir un mode de règlement par ID
  async getModeById(id: number): Promise<ModeReglement> {
    const mode = await this.modeReglementRepository.findOne({
      where: { id }, // La condition pour rechercher par ID
    });

    if (!mode) {
      throw new NotFoundException(
        `Mode de règlement avec ID ${id} non trouvé.`,
      );
    }
    return mode;
  }

  // Créer un nouveau mode de règlement
  async createMode(data: Partial<ModeReglement>): Promise<ModeReglement> {
    const mode = this.modeReglementRepository.create(data);
    return this.modeReglementRepository.save(mode);
  }

  // Mettre à jour un mode de règlement
  async updateMode(
    id: number,
    data: Partial<ModeReglement>,
  ): Promise<ModeReglement> {
    const mode = await this.getModeById(id);
    Object.assign(mode, data);
    return this.modeReglementRepository.save(mode);
  }

  // Supprimer un mode de règlement
  async deleteMode(id: number): Promise<void> {
    const mode = await this.getModeById(id);
    await this.modeReglementRepository.remove(mode);
  }
}
