import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodePromoParametrageService } from './CodePromo.service';
import { CodePromoParametrage } from './CodePromo.entity';
import { CodePromoParametrageController } from './CodePromo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CodePromoParametrage])],
  providers: [CodePromoParametrageService],
  controllers: [CodePromoParametrageController],
})
export class CodePromoParametrageModule {}
