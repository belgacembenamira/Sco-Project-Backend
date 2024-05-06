import { IsNumber } from 'class-validator'; // Pour la validation des données

export class UpdateStatusDto {
  @IsNumber() // Assure que c'est un nombre
  id: number;
  @IsNumber() // Assure que c'est un nombre
  tempsAffichage: number;

  @IsNumber() // Assure que c'est un nombre
  tempsVeille: number;
}
