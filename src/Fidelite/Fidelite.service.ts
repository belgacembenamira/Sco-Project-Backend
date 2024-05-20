import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fidelite } from './fidelite.entity';
import { UpdateFideliteDto } from './update-fidelite.dto';
import { CreateFideliteDto } from './create-fidelite.dto';

@Injectable()
export class FideliteService {
  constructor(
    @InjectRepository(Fidelite)
    private fideliteRepository: Repository<Fidelite>,
  ) {}

  async findAll(): Promise<Fidelite[]> {
    return this.fideliteRepository.find();
  }
  async update(
    id: number,
    updateFideliteDto: UpdateFideliteDto,
  ): Promise<Fidelite> {
    // Utilisation de la méthode findOne avec la clause where pour récupérer l'entité mise à jour
    await this.fideliteRepository.update({ id }, updateFideliteDto);
    return this.fideliteRepository.findOne({ where: { id } });
  }
  async create(createFideliteDto: CreateFideliteDto): Promise<Fidelite> {
    const newFidelite = this.fideliteRepository.create(createFideliteDto);
    return await this.fideliteRepository.save(newFidelite);
  }
  //   async findById(id: number): Promise<Fidelite> {
  //     const fidelite = await this.fideliteRepository.findOne(id);

  //     if (!fidelite) {
  //       throw new NotFoundException(`Fidelite with ID ${id} not found`);
  //     }

  //     return fidelite;
  //   }
  async findByIdWithWhere(id: number): Promise<Fidelite> {
    const fidelite = await this.fideliteRepository.findOne({
      where: { id },
    });

    if (!fidelite) {
      throw new NotFoundException(`Fidelite with ID ${id} not found`);
    }

    console.log(fidelite);
    return fidelite;
  }
}
