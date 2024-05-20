import { Injectable, HttpServer } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    private httpService: HttpServer, // Utilisez HttpService à la place de HttpServer
  ) {}

  async fetchCityByPostalCode(
    codePostal: string,
  ): Promise<{ name: string; count: number }> {
    try {
      const response = await this.httpService
        .get(`https://geo.api.gouv.fr/communes`, {
          params: { codePostal },
        })
        .toPromise();

      if (response.data.length > 0) {
        const cityData = response.data[0];

        // Recherchez la ville dans la base de données par son code
        let city = await this.cityRepository.findOne({ where: { code: cityData.code } });

        if (city) {
          // Si la ville existe déjà, incrémente le compteur
          city.count += 1;
          city = await this.cityRepository.save(city); // Met à jour la ville dans la base de données
        } else {
          // Si la ville n'existe pas, crée une nouvelle entrée dans la base de données
          city = await this.cityRepository.save({
            name: cityData.nom,
            code: cityData.code,
            count: 1,
          });
        }

        return { name: city.name, count: city.count };
      } else {
        throw new Error('City not found');
      }
    } catch (error) {
      throw new Error('Error fetching city data');
    }
  }
}
