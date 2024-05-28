// src/client/dto/create-client.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  readonly telcl: string;

  @IsString()
  @IsNotEmpty()
  readonly nomcl: string;

  @IsString()
  @IsNotEmpty()
  readonly numberCardfid: string;

  @IsNumber()
  @IsOptional()
  montantSoldeCompteClient?: number;
}
