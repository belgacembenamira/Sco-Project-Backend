import { IsBoolean, IsString, IsNotEmpty } from 'class-validator';

export class SaveAideDto {
  @IsBoolean() // Indique que ce champ doit être un booléen
  isMessageHelp: boolean;

  @IsBoolean()
  isAlertSound: boolean;

  @IsBoolean()
  isServerChecked: boolean;

  @IsString()
  borneNumber?: string;

  @IsString()
  location?: string;
}
