import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './city.entity';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async getCityByPostalCode(@Body('codePostal') codePostal: string) {
    const city = await this.cityService.fetchCityByPostalCode(codePostal);
    return city;
  }
  @Get()
  async getAllCities(): Promise<City[]> {
    return this.cityService.findAllCities();
  }
}
