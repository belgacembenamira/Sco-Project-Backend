import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoCodeEntity } from './promo-code.entity'; // Assurez-vous que le chemin d'importation est correct
import { PromoCodeService } from './promo-code.service';
import { PromoCodeController } from './promo-code.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PromoCodeEntity])],
  providers: [PromoCodeService],
  controllers: [PromoCodeController],
})
export class PromoCodeModule {}
