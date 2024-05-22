import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ImageUrl {
  @IsString()
  urlDefault: string;
}

class AdvancedPrice {
  @IsNumber()
  pricettc: number;
}

class Product {
  @IsNumber()
  reduction: number;

  @IsNumber()
  id: number;

  @IsString()
  barCode: string;

  @IsString()
  title: string;

  @IsString()
  prix: string;

  @IsNumber()
  qty: number;

  @ValidateNested()
  @Type(() => ImageUrl)
  imageUrl: ImageUrl;

  @ValidateNested()
  @Type(() => AdvancedPrice)
  price: AdvancedPrice;

  @IsNumber()
  remise?: number;

  @IsNumber()
  fidelity?: number;
}

class Payment {
  @IsString()
  paymentModeUuiD: string;

  @IsString()
  paymentMode: string;

  @IsNumber()
  paymentAmount: number;

  @IsNumber()
  totalAmountDeposited: number;

  @ValidateNested()
  @Type(() => Object)
  data: Record<string, number>;
}

export class CreateOrderDto {
  @IsString()
  orderOrigine: string;

  @IsString()
  ipOrigine: string;

  @IsNumber()
  horodatage: number;

  @IsNumber()
  totalttc: number;

  @IsString()
  deviseCode: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Product)
  lines: Product[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Payment)
  reglements: Payment[];

  @IsString()
  clientPhoneNumber: string;
}
