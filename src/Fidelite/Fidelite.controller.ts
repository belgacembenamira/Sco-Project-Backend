import { Controller, Get, Patch, Body, Param, Post } from '@nestjs/common';
import { FideliteService } from './fidelite.service';
import { Fidelite } from './fidelite.entity';
import { UpdateFideliteDto } from './update-fidelite.dto';
import { CreateFideliteDto } from './create-fidelite.dto';

@Controller('fidelite')
export class FideliteController {
  constructor(private readonly fideliteService: FideliteService) {}

  @Get()
  findAll(): Promise<Fidelite[]> {
    return this.fideliteService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateFideliteDto: UpdateFideliteDto,
  ): Promise<Fidelite> {
    return this.fideliteService.update(id, updateFideliteDto);
  }
  @Post()
  create(@Body() createFideliteDto: CreateFideliteDto): Promise<Fidelite> {
    return this.fideliteService.create(createFideliteDto);
  }
  @Get(':id')
  async getFideliteById(@Param('id') id: string): Promise<Fidelite> {
    return this.fideliteService.findByIdWithWhere(parseInt(id, 10));
  }
}
