/**
 * @description      :
 * @author           : belgacem
 * @group            :
 * @created          : 18/02/2024 - 23:02:25
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 18/02/2024
 * - Author          : belgacem
 * - Modification    :
 **/
import {
  IsOptional,
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  designation?: string;

  @IsOptional()
  @IsNumber()
  prix?: number;



  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsNumber()
  remise?: number;

  @IsOptional()
  @IsString()
  qcCode?: string;
}
