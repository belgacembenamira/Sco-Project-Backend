import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './City.controller';
import { CityService } from './City.service';
import { City } from './city.entity';
import { HttpModule } from '@nestjs/common'; // Import HttpModule from '@nestjs/common'

@Module({
  imports: [
    TypeOrmModule.forFeature([City]),
    HttpModule, // Ajouter HttpModule ici
  ],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
