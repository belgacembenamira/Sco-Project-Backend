import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateFideliteDto {
  @IsOptional()
  @IsBoolean()
  isFidelityEnabled?: boolean;

  @IsOptional()
  @IsString()
  iconUrl?: string;

  @IsOptional()
  @IsBoolean()
  isCardAuthEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  isCodeEntryRequired?: boolean;

  @IsOptional()
  @IsBoolean()
  isPhoneAuthEnabled?: boolean;
}
