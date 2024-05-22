import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule from '@nestjs/axios'
import { CityService } from './city.service';
import { CityController } from './City.controller';
import { City } from './city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([City]),
    HttpModule, // Ajouter HttpModule ici
  ],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
