// code-postal.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCodePostalDtoManger } from './dto/create-code-postal.dto';
import { UpdateCodePostalDtoManager } from './dto/update-code-postal.dto';
import { CodePostalmanager } from './code-postal.entity';

@Injectable()
export class CodePostalService {
  constructor(
    @InjectRepository(CodePostalmanager)
    private readonly codePostalRepository: Repository<CodePostalmanager>,
  ) {}

  async create(
    createCodePostalDto: CreateCodePostalDtoManger,
  ): Promise<CodePostalmanager> {
    const newCodePostal = this.codePostalRepository.create(createCodePostalDto);
    return this.codePostalRepository.save(newCodePostal);
  }

  async findAll(): Promise<CodePostalmanager[]> {
    return this.codePostalRepository.find();
  }

  async findOne(id: number): Promise<CodePostalmanager> {
    const codePostal = await this.codePostalRepository.findOne({
      where: { id },
    });
    if (!codePostal) {
      throw new NotFoundException(`CodePostal with id ${id} not found`);
    }
    return codePostal;
  }

  async update(
    id: number,
    updateCodePostalDto: CreateCodePostalDtoManger,
  ): Promise<CodePostalmanager> {
    await this.codePostalRepository.update(id, updateCodePostalDto);
    const updatedCodePostal = await this.findOne(id);
    return updatedCodePostal;
  }

  async patch(
    id: number,
    updateCodePostalDto: UpdateCodePostalDtoManager,
  ): Promise<CodePostalmanager> {
    await this.codePostalRepository.update(id, updateCodePostalDto);
    const patchedCodePostal = await this.findOne(id);
    return patchedCodePostal;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.codePostalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`CodePostal with id ${id} not found`);
    }
    return true;
  }
}
