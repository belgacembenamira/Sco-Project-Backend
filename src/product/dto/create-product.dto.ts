/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 18/02/2024 - 23:00:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/02/2024
    * - Author          : belgacem
    * - Modification    : 
**/
import { IsString, IsNumber, IsUrl, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  designation: string;

  @IsNumber()
  prix: number;


  @IsUrl()
  url: string;

  @IsNumber()
  @IsOptional()
  remize?: number;

  @IsString()
  qcCode: string;
}

