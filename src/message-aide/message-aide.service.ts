import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageAide } from './message-aide.entity';
import { SaveAideDto } from './SaveAideDto';
import { UpdateAideDto } from './UpdateAideDto';

@Injectable()
export class MessageAideService {
  constructor(
    @InjectRepository(MessageAide)
    private readonly messageAideRepository: Repository<MessageAide>,
  ) {}
  async patchAideData(
    id: number,
    data: UpdateAideDto, // DTO partiel
  ): Promise<MessageAide> {
    const existingData = await this.getAideDataById(id);
    if (!existingData) {
      throw new HttpException(
        'Data with given ID not found',
        HttpStatus.NOT_FOUND,
      );
    }

    // Mise à jour partielle
    Object.assign(existingData, data);
    return await this.messageAideRepository.save(existingData);
  }
  async updateAideData(
    id: number,
    data: SaveAideDto,
  ): Promise<MessageAide | null> {
    const existingData = await this.messageAideRepository.findOne({
      where: { id },
    });

    if (!existingData) {
      return null; // Retourne null si l'enregistrement n'existe pas
    }

    // Met à jour les champs avec les nouvelles données
    this.messageAideRepository.merge(existingData, data);

    return this.messageAideRepository.save(existingData);
  }
  async getAideDataById(id: number): Promise<MessageAide | null> {
    return this.messageAideRepository.findOne({ where: { id } }); // Trouver par ID
  }
  // Enregistre les données reçues dans la base de données
  async saveAideData(data: SaveAideDto): Promise<MessageAide> {
    const newMessageAide = this.messageAideRepository.create(data);
    return this.messageAideRepository.save(newMessageAide); // Retourne un seul objet
  }

  // Récupère tous les enregistrements de la base de données
  async getAllAideData(): Promise<MessageAide[]> {
    return this.messageAideRepository.find(); // Retourne un tableau d'objets
  }
}
