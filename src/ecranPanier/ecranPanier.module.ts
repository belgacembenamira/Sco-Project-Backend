// src/ecran-panier/ecran-panier.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcranPanierController } from './ecranPanier.controller';
import { EcranPanier } from './ecranPanier.entity';
import { EcranPanierService } from './ecranPanier.service';


@Module({
  imports: [TypeOrmModule.forFeature([EcranPanier])],
  providers: [EcranPanierService],
  controllers: [EcranPanierController],
})
export class EcranPanierModule {}
