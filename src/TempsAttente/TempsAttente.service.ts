import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TempsAttente } from './TempsAttente.entity';
import { UpdateStatusDto } from './UpdateStatusDto'; // Import du DTO
import { CreateTempsAttenteDto } from './CreateTempsAttenteDto';
import { UpdateTempsAttenteDto } from './UpdateTempsAttenteDto';
@Injectable()
export class TempsAttenteService {
  constructor(
    @InjectRepository(TempsAttente) // Injection du dépôt TypeORM
    private readonly tempsAttenteRepository: Repository<TempsAttente>,
  ) {}
  async createTempsAttente(
    createTempsAttenteDto: CreateTempsAttenteDto,
  ): Promise<TempsAttente> {
    const newTempsAttente = this.tempsAttenteRepository.create(
      createTempsAttenteDto,
    ); // Créer un nouvel enregistrement avec les données du DTO
    return await this.tempsAttenteRepository.save(newTempsAttente); // Sauvegarder le nouvel enregistrement
  }
  async getTempsAttenteById(id: number): Promise<TempsAttente | null> {
    const tempsAttente = await this.tempsAttenteRepository.findOne({
      where: { id },
    }); // Condition de recherche par ID
    return tempsAttente; // Retourner l'enregistrement ou null
  }
  async getAllTempsAttente(): Promise<TempsAttente[]> {
    return await this.tempsAttenteRepository.find(); // Retourne tous les enregistrements
  }
  // Mettre à jour le temps d'attente avec le DTO
  async updateTempsAttente(
    updateStatusDto: UpdateStatusDto,
  ): Promise<TempsAttente> {
    const tempsAttente = await this.getTempsAttenteById(updateStatusDto.id); // Pass the id argument
    tempsAttente.tempsAffichage = updateStatusDto.tempsAffichage; // Mettre à jour
    tempsAttente.tempsVeille = updateStatusDto.tempsVeille;
    return await this.tempsAttenteRepository.save(tempsAttente); // Sauvegarder les modifications
  }
  async updateTempsAttenteById(
    id: number,
    updateTempsAttenteDto: UpdateTempsAttenteDto, // DTO pour les données à mettre à jour
  ): Promise<TempsAttente | null> {
    const tempsAttente = await this.tempsAttenteRepository.findOne({
      where: { id },
    });
    if (!tempsAttente) {
      return null; // Retourner null si l'enregistrement n'est pas trouvé
    }

    // Mettre à jour avec les valeurs du DTO
    tempsAttente.tempsAffichage = updateTempsAttenteDto.tempsAffichage;
    tempsAttente.tempsVeille = updateTempsAttenteDto.tempsVeille; // Corriger l'utilisation de la variable tempsVeille

    return await this.tempsAttenteRepository.save(tempsAttente); // Sauvegarder les modifications
  }
}
