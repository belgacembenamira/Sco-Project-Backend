import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Put,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ManagerService } from './manager.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, basename } from 'path';
import { Manager } from './manager.entity';
import { CreateManagerDto } from './create-manager.dto';
import { UpdateManagerDto } from './update-manager.dto';

const storage = diskStorage({
  destination: './uploads', // Stockage local des fichiers
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${basename(file.originalname)}`; // Nom unique avec timestamp
    cb(null, uniqueName); // Définir le nom du fichier
  },
});

@Controller('manager') // Route de base
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('create') // Endpoint pour créer un manager
  async createManager(@Body() data: CreateManagerDto) {
    return await this.managerService.createManager(data); // Appel du service
  }

  @Get(':id') // Récupérer un manager par ID
  async getManager(@Param('id') id: number) {
    return await this.managerService.getManager(id);
  }

  @Patch('/update/:id')
  async updateManager(
    @Param('id', ParseIntPipe) id: number,
    @Body() updates: Partial<Manager>, // Corrigez ici en utilisant @Body pour obtenir les mises à jour des champs du client
  ) {
    const manager = await this.managerService.updateManager(id, updates);

    if (!manager) {
      throw new NotFoundException(`Manager avec l'ID ${id} non trouvé`);
    }

    return manager;
  }

  @Delete(':id') // Suppression par ID
  async deleteManager(@Param('id') id: number) {
    await this.managerService.deleteManager(id); // Appel du service
  }

  @Post('upload') // Endpoint pour téléverser des fichiers
  @UseInterceptors(FileInterceptor('file', { storage })) // Intercepter le fichier
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: { id: number },
  ) {
    if (!file) {
      throw new BadRequestException('Aucun fichier reçu');
    }

    const fileUrl = `http://localhost:3000/${file.filename}`; // Construire l'URL du fichier
    await this.managerService.updateManager(data.id, { fileUrl }); // Mise à jour du manager avec l'URL du fichier
    return { fileUrl }; // Retourner l'URL comme réponse
  }
  @Put(':id') // Endpoint pour remplacer complètement une ressource
  async replaceManager(
    @Param('id') id: number,
    @Body() newData: UpdateManagerDto,
  ) {
    const manager = await this.managerService.getManager(id); // Obtenir l'instance actuelle

    if (!manager) {
      throw new BadRequestException(`Manager avec l'ID ${id} non trouvé`); // Valider l'existence
    }

    // Remplacer les propriétés existantes avec de nouvelles données
    Object.assign(manager, newData);

    // Sauvegarder et retourner la ressource mise à jour
    return await this.managerService.updateManager(id, newData);
  }
}
