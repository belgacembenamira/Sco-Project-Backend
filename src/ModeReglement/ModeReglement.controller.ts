import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { ModeReglement } from './ModeReglement.entity';
import { ModeReglementService } from './ModeReglement.service';

@Controller('mode-reglement')
export class ModeReglementController {
  constructor(private readonly modeReglementService: ModeReglementService) {}

  @Get() // Obtenir tous les modes de règlement
  async getAllModes(): Promise<ModeReglement[]> {
    return this.modeReglementService.getAllModes();
  }

  @Get(':id') // Obtenir un mode par ID
  async getModeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ModeReglement> {
    return this.modeReglementService.getModeById(id);
  }

  @Post() // Créer un mode de règlement
  async createMode(
    @Body() data: Partial<ModeReglement>,
  ): Promise<ModeReglement> {
    return this.modeReglementService.createMode(data);
  }

  @Put(':id') // Mettre à jour un mode de règlement
  async updateMode(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<ModeReglement>,
  ): Promise<ModeReglement> {
    return this.modeReglementService.updateMode(id, data);
  }
  @Patch(':id') // Mettre à jour partiellement un mode de règlement
  async patchMode(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<ModeReglement>,
  ): Promise<ModeReglement> {
    const mode = await this.modeReglementService.getModeById(id);
    if (!mode) {
      throw new NotFoundException(`Mode de règlement avec ID ${id} non trouvé.`);
    }
    Object.assign(mode, data); // Mise à jour partielle avec les données fournies
    return await this.modeReglementService.updateMode(id, mode); // Sauvegarde les modifications
  }

  @Delete(':id') // Supprimer un mode de règlement
  async deleteMode(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.modeReglementService.deleteMode(id);
  }
}
