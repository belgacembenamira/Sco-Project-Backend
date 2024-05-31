import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CityService {
  private readonly logger = new Logger(CityService.name);

  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    private httpService: HttpService,
  ) {}

  async fetchCityByPostalCode(
    codePostal: string,
  ): Promise<{ name: string; count: number }> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(`https://geo.api.gouv.fr/communes`, {
          params: { codePostal },
        }),
      );

      if (response.data.length > 0) {
        const cityData = response.data[0];

        let city = await this.cityRepository.findOne({
          where: { code: cityData.code },
        });

        if (city) {
          city.count += 1;
          city = await this.cityRepository.save(city);
        } else {
          city = await this.cityRepository.save({
            name: cityData.nom,
            code: cityData.code,
            count: 1,
          });
        }

        return { name: city.name, count: city.count };
      } else {
        this.logger.warn(`City not found for postal code: ${codePostal}`);
        throw new Error('City not found');
      }
    } catch (error) {
      this.logger.error(
        `Error fetching city data for postal code ${codePostal}: ${error.message}`,
      );
      throw new Error(`Error fetching city data: ${error.message}`);
    }
  }

  async findAllCities(): Promise<City[]> {
    try {
      return await this.cityRepository.find();
    } catch (error) {
      this.logger.error(`Error fetching all cities: ${error.message}`);
      throw new Error(`Error fetching all cities: ${error.message}`);
    }
  }
}
