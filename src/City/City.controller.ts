import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async getCityByPostalCode(@Body('codePostal') codePostal: string) {
    const city = await this.cityService.fetchCityByPostalCode(codePostal);
    return city;
  }
}
