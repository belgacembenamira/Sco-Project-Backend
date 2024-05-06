import {
  Controller,
  Get,
  Put,
  Body,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { TempsAttenteService } from './TempsAttente.service';
import { UpdateStatusDto } from './UpdateStatusDto';
import { CreateTempsAttenteDto } from './CreateTempsAttenteDto';
import { UpdateTempsAttenteDto } from './UpdateTempsAttenteDto';
import { PartialUpdateTempsAttenteDto } from './PartialUpdateTempsAttenteDto';

@Controller('tempsAttente') // Chemin de base pour le contrôleur
export class TempsAttenteController {
  constructor(private readonly tempsAttenteService: TempsAttenteService) {}

  @Get('/getTempsAttente/:id')
  async getTempsAttenteById(@Param('id') id: number) {
    // Obtenir le paramètre `id` de la route
    try {
      const tempsAttente =
        await this.tempsAttenteService.getTempsAttenteById(id); // Appel du service
      if (!tempsAttente) {
        throw new HttpException('TempsAttente not found', HttpStatus.NOT_FOUND); // Si rien n'est trouvé
      }
      return tempsAttente; // Retourner l'enregistrement trouvé
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve tempsAttente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ); // Gestion des erreurs inattendues
    }
  }

  @Put('/updateStatus') // Mettre à jour le temps d'attente
  async updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    try {
      const updatedTempsAttente =
        await this.tempsAttenteService.updateTempsAttente(updateStatusDto);
      return updatedTempsAttente;
    } catch (error) {
      throw new HttpException(
        'Failed to update tempsAttente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('/getAllTempsAttente')
  async getAllTempsAttente() {
    try {
      const allTempsAttente =
        await this.tempsAttenteService.getAllTempsAttente(); // Appel du service
      return allTempsAttente; // Retourner tous les enregistrements
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve all tempsAttente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ); // Gestion des erreurs inattendues
    }
  }
  @Post('/createTempsAttente')
  async createTempsAttente(
    @Body() createTempsAttenteDto: CreateTempsAttenteDto,
  ) {
    try {
      const newTempsAttente = await this.tempsAttenteService.createTempsAttente(
        createTempsAttenteDto,
      );
      return newTempsAttente; // Retourner le nouvel enregistrement
    } catch (error) {
      throw new HttpException(
        'Failed to create TempsAttente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ); // Gestion des erreurs inattendues
    }
  }
  @Put('/updateStatus/:id')
  async updateStatusPut(
    @Param('id') id: number,
    @Body() updateTempsAttenteDto: UpdateTempsAttenteDto,
  ) {
    try {
      const updatedTempsAttente =
        await this.tempsAttenteService.updateTempsAttenteById(
          id,
          updateTempsAttenteDto,
        );
      if (!updatedTempsAttente) {
        throw new HttpException('TempsAttente not found', HttpStatus.NOT_FOUND); // Si l'enregistrement n'est pas trouvé
      }
      return updatedTempsAttente; // Retourner l'enregistrement mis à jour
    } catch (error) {
      throw new HttpException(
        'Failed to update TempsAttente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ); // Gestion des erreurs inattendues
    }
  }
  @Patch('/update/:id') // Nouveau point de terminaison pour PATCH
  async patchTempsAttente(
    @Param('id') id: number,
    @Body() partialUpdateDto: PartialUpdateTempsAttenteDto, // DTO partiel
  ) {
    try {
      const updatedTempsAttente =
        await this.tempsAttenteService.patchTempsAttente(id, partialUpdateDto);
      if (!updatedTempsAttente) {
        throw new HttpException('TempsAttente not found', HttpStatus.NOT_FOUND); // Si l'enregistrement n'est pas trouvé
      }
      return updatedTempsAttente; // Retourner l'enregistrement mis à jour
    } catch (error) {
      throw new HttpException(
        'Failed to patch TempsAttente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ); // Gestion des erreurs inattendues
    }
  }
}
