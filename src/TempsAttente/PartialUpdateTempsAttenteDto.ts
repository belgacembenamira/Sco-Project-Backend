import {
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class PartialUpdateTempsAttenteDto {
  @IsOptional() // Permet que le champ soit absent
  @IsNumber() // Assure que c'est un nombre
  tempsAffichage: number;
  @IsOptional() // Permet que le champ soit absent
  @IsNumber() // Assure que c'est un nombre
  tempsVeille: number;
}
