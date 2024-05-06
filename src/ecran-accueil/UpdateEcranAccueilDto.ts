import { IsString, IsBoolean, IsOptional, IsUrl } from 'class-validator';

export class UpdateEcranAccueilDto {
  @IsBoolean()
  ecranPub: boolean; // Indiquer le type exact et requis

  @IsString()
  defaultLang: string; // Même chose ici

  @IsBoolean()
  multiLang: boolean;

  @IsBoolean()
  logoPub: boolean;

  @IsBoolean()
  majuscule: boolean;

  @IsString()
  @IsOptional()
  uploadedImage?: string | null; // Facultatif

  @IsString()
  @IsOptional()
  logoPath?: string | null;

  @IsString()
  @IsOptional()
  uploadedVideo?: string | null;
}
