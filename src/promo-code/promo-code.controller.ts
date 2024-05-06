import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PromoCodeEntity } from './promo-code.entity'; // Assurez-vous que le chemin d'importation est correct
import { PromoCodeService } from './promo-code.service';

@Controller('promo-codes')
export class PromoCodeController {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @Get()
  findAll(): Promise<PromoCodeEntity[]> {
    return this.promoCodeService.findAll();
  }

  @Get(':designation')
  findOneByDesignation(
    @Param('designation') designation: string,
  ): Promise<PromoCodeEntity | undefined> {
    return this.promoCodeService.findOneByDesignation(designation);
  }

  @Post()
  create(
    @Body() createPromoCodeDto: PromoCodeEntity,
  ): Promise<PromoCodeEntity> {
    return this.promoCodeService.create(createPromoCodeDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePromoCodeDto: PromoCodeEntity,
  ): Promise<PromoCodeEntity | undefined> {
    return this.promoCodeService.update(+id, updatePromoCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.promoCodeService.remove(+id);
  }
  @Put('by-designation/:designation')
  async updateByDesignation(
    @Param('designation') designation: string,
    @Body() promoCodeData: PromoCodeEntity,
  ): Promise<PromoCodeEntity> {
    return this.promoCodeService.updateByDesignation(
      designation,
      promoCodeData,
    );
  }
  @Delete('by-designation/:designation')
  async removeByDesignation(
    @Param('designation') designation: string,
  ): Promise<void> {
    return this.promoCodeService.removeByDesignation(designation);
  }
}
