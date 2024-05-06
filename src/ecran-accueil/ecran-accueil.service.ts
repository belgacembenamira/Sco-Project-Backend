import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EcranAccueil } from './ecran-accueil.entity';
import { CreateEcranAccueilDto } from './CreateEcranAccueilDto';
import { UpdateEcranAccueilDto } from './UpdateEcranAccueilDto';

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
  async replaceEcranAccueil(
    id: number,
    newData: UpdateEcranAccueilDto,
  ): Promise<EcranAccueil> {
    const ecran = await this.getEcranAccueil(id);

    if (!ecran) {
      throw new NotFoundException(`Écran avec l'ID ${id} non trouvé`);
    }

    // Remplacement complet avec les nouvelles données
    Object.assign(ecran, newData); // Réaffectation complète des données
    return await this.ecranAccueilRepository.save(ecran); // Sauvegarde de la ressource mise à jour
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
  async createEcranAccueil(data: CreateEcranAccueilDto): Promise<EcranAccueil> {
    const newEcranAccueil = this.ecranAccueilRepository.create(data);
    return this.ecranAccueilRepository.save(newEcranAccueil); // Avoid unnecessary `await`
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
  async updateUploadedFileLogo(
    id: number,
    fileUrl: string,
  ): Promise<EcranAccueil> {
    // Récupérer l'écran par ID
    const ecran = await this.getEcranAccueil(id);

    if (!ecran) {
      throw new Error('Écran non trouvé'); // Si l'écran n'existe pas, lancer une erreur
    }

    // Mettre à jour le chemin du logo uniquement
    ecran.logoPath = fileUrl; // Mise à jour du logo
    // Ne pas toucher aux autres champs (uploadedImage, uploadedVideo, etc.)

    // Sauvegarder les modifications dans la base de données
    return await this.ecranAccueilRepository.save(ecran);
  }

  async deleteEcranAccueil(id: number): Promise<void> {
    await this.ecranAccueilRepository.delete(id);
  }
}
