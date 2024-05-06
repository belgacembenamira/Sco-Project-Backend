import { IsOptional, IsBoolean, IsString } from 'class-validator'; // Correct imports

export class UpdateAideDto {
  @IsOptional() // Permet des mises à jour partielles
  @IsBoolean() // Correction du type
  isMessageHelp?: boolean; // Utilisez `?` pour indiquer que c'est optionnel

  @IsOptional()
  @IsBoolean() // Type corrigé
  isAlertSound?: boolean;

  @IsOptional()
  @IsBoolean() // Type corrigé
  isServerChecked?: boolean;

  @IsOptional()
  @IsString() // Correction du type
  borneNumber?: string; // String selon l'entité `MessageAide`

  @IsOptional()
  @IsString() // Correction du type
  location?: string; // Doit être cohérent avec l'entité
}
