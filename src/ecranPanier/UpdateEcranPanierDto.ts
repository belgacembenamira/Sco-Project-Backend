// src/ecran-panier/dto/update-ecran-panier.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { EcranPanier } from './ecranPanier.entity';


export class UpdateEcranPanierDto extends PartialType(EcranPanier) {}
