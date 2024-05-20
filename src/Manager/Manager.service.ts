import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './manager.entity';
import { CreateManagerDto } from './create-manager.dto';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  async createManager(data: CreateManagerDto): Promise<Manager> {
    const newManager = this.managerRepository.create(data);
    return await this.managerRepository.save(newManager); // Créer et sauvegarder
  }

  async getManager(id: number): Promise<Manager | null> {
    const manager = await this.managerRepository.findOne({
      where: { id },
    });

    if (!manager) {
      throw new NotFoundException(`Manager avec l'ID ${id} non trouvé`);
    }

    return manager;
  }

  // Met à jour un manager avec des données spécifiques
  async updateManager(id: number, updates: Partial<Manager>): Promise<Manager> {
    const manager = await this.getManager(id);

    if (!manager) {
      throw new NotFoundException(`Manager avec l'ID ${id} non trouvé`);
    }

    Object.assign(manager, updates); // Applique les mises à jour aux champs de l'entité
    return await this.managerRepository.save(manager); // Sauvegarde après mise à jour
  }

  async deleteManager(id: number): Promise<void> {
    await this.managerRepository.delete(id); // Suppression par ID
  }
}
