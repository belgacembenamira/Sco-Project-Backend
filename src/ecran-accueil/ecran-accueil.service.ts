import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EcranAccueil } from './ecran-accueil.entity';

@Injectable()
export class EcranAccueilService {
  constructor(
    @InjectRepository(EcranAccueil)
    private readonly ecranAccueilRepository: Repository<EcranAccueil>,
  ) {}
  async getEcranAccueil(id: number): Promise<EcranAccueil> {
    const ecran = await this.ecranAccueilRepository.findOne({ where: { id } });

    if (!ecran) {
      throw new BadRequestException(`Écran avec l'ID ${id} non trouvé`); // Message d'erreur clair
    }

    return ecran;
  }

  // async getEcranAccueil(id: number): Promise<EcranAccueil> {
  //   const ecran = await this.ecranAccueilRepository.findOne({ where: { id } });
  //   if (!ecran) {
  //     throw new Error('Écran non trouvé');
  //   }
  //   return ecran;
  // }

  async getAllEcranAccueil(): Promise<EcranAccueil[]> {
    return await this.ecranAccueilRepository.find();
  }

  async createEcranAccueil(data: Partial<EcranAccueil>): Promise<EcranAccueil> {
    const newEcranAccueil = this.ecranAccueilRepository.create(data);
    return await this.ecranAccueilRepository.save(newEcranAccueil);
  }

  async updateEcranAccueil(
    id: number,
    updates: Partial<EcranAccueil>,
  ): Promise<EcranAccueil> {
    await this.ecranAccueilRepository.update(id, updates);
    return await this.getEcranAccueil(id);
  }

  async updateUploadedFile(
    id: number,
    fieldToUpdate: string,
    fileUrl: string,
  ): Promise<EcranAccueil> {
    const ecran = await this.getEcranAccueil(id);

    if (!ecran) {
      throw new Error('Écran non trouvé');
    }

    if (fieldToUpdate === 'uploadedImage') {
      ecran.uploadedImage = fileUrl;
      ecran.uploadedVideo = null;
    } else if (fieldToUpdate === 'uploadedVideo') {
      ecran.uploadedVideo = fileUrl;
      ecran.uploadedImage = null;
    }

    return await this.ecranAccueilRepository.save(ecran);
  }

  async deleteEcranAccueil(id: number): Promise<void> {
    await this.ecranAccueilRepository.delete(id);
  }
}
