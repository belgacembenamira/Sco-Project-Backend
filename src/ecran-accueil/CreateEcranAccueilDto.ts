import { IsString, IsBoolean, IsOptional, IsUrl } from 'class-validator';

export class CreateEcranAccueilDto {
  @IsBoolean()
  @IsOptional()
  ecranPub?: boolean; // Faculte, avec valeur par defaut à `false`

  @IsString()
  @IsOptional()
  defaultLang?: string; // Faculte, avec valeur par defaut à 'fr'

  @IsBoolean()
  @IsOptional()
  multiLang?: boolean; // Faculte, avec valeur par defaut à `false`

  @IsBoolean()
  @IsOptional()
  logoPub?: boolean; // Faculte, avec valeur par defaut à `false`

  @IsBoolean()
  @IsOptional()
  majuscule?: boolean; // Faculte, avec valeur par defaut à `false`

  @IsString()
  @IsOptional()
  uploadedImage?: string | null; // Image téléchargée, faculte

  @IsString()
  @IsOptional()
  logoPath?: string | null; // Logo, faculte

  @IsString()
  @IsOptional()
  uploadedVideo?: string | null; // Vidéo téléchargée, faculte
}
