import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './color.entity';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
  ) {}

  findAll(): Promise<Color[]> {
    return this.colorRepository.find();
  }

  findOne(id: number): Promise<Color> {
    return this.colorRepository.findOneBy({ id });
  }

  async create(color: Color): Promise<Color> {
    return this.colorRepository.save(color);
  }

  async update(id: number, color: Partial<Color>): Promise<void> {
    await this.colorRepository.update(id, color);
  }

  async remove(id: number): Promise<void> {
    await this.colorRepository.delete(id);
  }

  // Nouvelle méthode pour trouver des couleurs par condition
  findByCondition(condition: Partial<Color>): Promise<Color[]> {
    return this.colorRepository.find({ where: condition });
  }
}
