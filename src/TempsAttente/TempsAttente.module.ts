import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempsAttenteController } from './TempsAttente.controller';
import { TempsAttenteService } from './TempsAttente.service';
import { TempsAttente } from './TempsAttente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TempsAttente])],
  providers: [TempsAttenteService],
  controllers: [TempsAttenteController],
})
export class TempsAttenteModule {}
