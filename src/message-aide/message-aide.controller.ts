import {
  Controller,
  Get,
  Put,
  Body,
  HttpException,
  HttpStatus,
  Post,
  Param,
  Patch,
} from '@nestjs/common';
import { MessageAideService } from './message-aide.service';
import { SaveAideDto } from './SaveAideDto';
import { MessageAide } from './message-aide.entity';
import { UpdateAideDto } from './UpdateAideDto';

@Controller('message-aide')
export class MessageAideController {
  constructor(private readonly messageAideService: MessageAideService) {}
  @Patch('/update/:id') // Nouveau point de terminaison pour PATCH
  async patchMessageAide(
    @Param('id') id: number,
    @Body() data: UpdateAideDto, // Utilisation d'un DTO partiel
  ) {
    const updatedData = await this.messageAideService.patchAideData(id, data);

    if (!updatedData) {
      throw new HttpException(
        'Data with given ID not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'Data patched successfully',
      data: updatedData,
    };
  }
  @Get('/:id') // Point de terminaison GET avec un identifiant
  async getMessageAideById(@Param('id') id: number): Promise<MessageAide> {
    const data = await this.messageAideService.getAideDataById(id); // Récupère les données par ID

    if (!data) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }

    return data; // Retourne les données associées à l'ID
  }

  @Put('/save/:id')
  async updateMessageAide(@Param('id') id: number, @Body() data: SaveAideDto) {
    // Supprimez la validation qui nécessite des valeurs non vides
    const updatedData = await this.messageAideService.updateAideData(id, data);

    if (!updatedData) {
      throw new HttpException(
        'Data with given ID not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'Data updated successfully',
      data: updatedData,
    };
  }

  @Get('/')
  async getAllAideData() {
    const allData = await this.messageAideService.getAllAideData(); // Utilise le service pour récupérer

    return {
      message: 'Data retrieved successfully',
      data: allData,
    };
  }
  @Post('/create')
  async createMessageAide(@Body() data: SaveAideDto) {
    // Aucune vérification nécessaire, on accepte que les champs puissent être nuls ou vides
    const newEntry = await this.messageAideService.saveAideData(data);

    return {
      message: 'MessageAide created successfully',
      data: newEntry,
    };
  }
}
