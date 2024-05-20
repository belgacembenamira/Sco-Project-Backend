import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './manager.entity';
import { ManagerService } from './manager.service';
import { ManagerController } from './Manager.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])], // Import du repository
  providers: [ManagerService], // Le service qui utilise le repository
  controllers: [ManagerController], // Le contrôleur qui utilise le service
})
export class ManagerModule {}
