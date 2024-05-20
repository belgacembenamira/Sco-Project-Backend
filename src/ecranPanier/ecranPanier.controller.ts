// src/ecran-panier/ecran-panier.controller.ts
import { Controller, Get, Post, Param, Patch, Delete, Body } from '@nestjs/common';
import { EcranPanier } from './ecranPanier.entity';
import { EcranPanierService } from './ecranPanier.service';
import { UpdateEcranPanierDto } from './UpdateEcranPanierDto';


@Controller('ecran-panier')
export class EcranPanierController {
  constructor(private readonly ecranPanierService: EcranPanierService) {}

  @Get()
  findAll(): Promise<EcranPanier[]> {
    return this.ecranPanierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<EcranPanier> {
    return this.ecranPanierService.findOne(id);
  }

  @Post()
  create(@Body() ecranPanier: EcranPanier): Promise<EcranPanier> {
    return this.ecranPanierService.create(ecranPanier);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEcranPanierDto: UpdateEcranPanierDto): Promise<void> {
    return this.ecranPanierService.update(id, updateEcranPanierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.ecranPanierService.remove(id);
  }
}
