import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';

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
@Post()
async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
  return this.clientService.create(createClientDto);
}

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() clientData: Partial<Client>,
  ): Promise<Client> {
    return this.clientService.update(id, clientData);
  }

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
    @Body('montantSoldeCompteClient') montantSoldeCompteClient: number,
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

  @Patch('addFidelity/:telcl')
  async addFidelityToClientBalance(
    @Param('telcl') telcl: string,
    @Body('fidelityToAdd') fidelityToAdd: number,
  ) {
    try {
      await this.clientService.addFidelityToClientBalance(telcl, fidelityToAdd);
      return { message: 'Client fidelity added to balance successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('numeroCardfid/:numeroCardfid')
  async findByNumeroCardfid(
    @Param('numeroCardfid') numeroCardfid: string,
  ): Promise<{
    montantSoldeCompteClient: number;
    telcl: string;
    nomcl: string;
  }> {
    try {
      const result =
        await this.clientService.findByNumeroCardfid(numeroCardfid);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Post('addClientManger')
  async addClientManger(
    @Body() createClientDto: CreateClientDto,
  ): Promise<Client> {
    console.log('Received data:', createClientDto); // Log the received data
    return this.clientService.createClientManger(createClientDto);
  }
}
