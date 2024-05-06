import { IsNumber } from 'class-validator';

export class UpdateTempsAttenteDto {
  @IsNumber() // Assure que c'est un nombre
  tempsAffichage: number;

  @IsNumber() // Assure que c'est un nombre
  tempsVeille: number;
}
