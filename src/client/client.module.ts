import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './client.entity'; // Importez l'entité Client

@Module({
  imports: [TypeOrmModule.forFeature([Client])], // Importez l'entité Client ici
  providers: [ClientService],
  exports: [ClientService], // Exportez le service pour permettre son injection dans d'autres modules
  controllers: [ClientController],
})
export class ClientModule {}
