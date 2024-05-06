import { IsNumber, IsOptional } from 'class-validator'; // Validation des données

export class CreateTempsAttenteDto {
  @IsNumber() // Valide que c'est un nombre
  @IsOptional() // Optionnel car il peut y avoir une valeur par défaut
  tempsAffichage: number;

  @IsNumber() // Valide que c'est un nombre
  @IsOptional() // Optionnel pour les mêmes raisons
  tempsVeille: number;
}
