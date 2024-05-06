import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Client> {
    return this.clientService.findOne(id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() clientData: Partial<Client>): Promise<Client> {
    return this.clientService.create(clientData);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() clientData: Partial<Client>,
  ): Promise<Client> {
    return this.clientService.update(id, clientData);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete(':id/delete')
  async remove(@Param('id') id: number): Promise<void> {
    return this.clientService.remove(id);
  }
  @Get('telcl/:telcl')
  async findByTelcl(@Param('telcl') telcl: string): Promise<Client> {
    return this.clientService.findByTelcl(telcl);
  }

  @Put('telcl/:telcl')
  async updateClientBalance(
    @Param('telcl') telcl: string,
    @Body('montantSoldeCompteClient') montantSoldeCompteClient: number, // Supposons que le montant est envoyé dans le corps de la requête
  ) {
    try {
      await this.clientService.updateClientBalance(
        telcl,
        montantSoldeCompteClient,
      );
      return { message: 'Client balance updated successfully' };
    } catch (error) {
      return { error };
    }
  }
}
