import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CodePromoParametrage } from './CodePromo.entity';
import { CodePromoParametrageService } from './CodePromo.service';

@Controller('promo-code-parametrage')
export class CodePromoParametrageController {
  constructor(
    private readonly CodePromoParametrageService: CodePromoParametrageService,
  ) {}

  @Get()
  findAll(): Promise<CodePromoParametrage[]> {
    return this.CodePromoParametrageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CodePromoParametrage> {
    return this.CodePromoParametrageService.findOne(id);
  }

  @Post()
  create(
    @Body() createPromoCodeDto: Partial<CodePromoParametrage>,
  ): Promise<CodePromoParametrage> {
    return this.CodePromoParametrageService.create(createPromoCodeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePromoCodeDto: Partial<CodePromoParametrage>,
  ): Promise<CodePromoParametrage> {
    return this.CodePromoParametrageService.update(id, updatePromoCodeDto);
  }
}
