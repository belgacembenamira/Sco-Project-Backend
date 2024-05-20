// create-fidelite.dto.ts

import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateFideliteDto {
  @IsBoolean()
  isFidelityEnabled: boolean;

  @IsOptional()
  @IsString()
  iconUrl?: string;

  @IsBoolean()
  @IsOptional()
  isCardAuthEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  isCodeEntryRequired?: boolean;

  @IsBoolean()
  @IsOptional()
  isPhoneAuthEnabled?: boolean;
}
