import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Color } from './color.entity';
import { ColorsService } from './color.service';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get()
  findAll(): Promise<Color[]> {
    return this.colorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Color> {
    return this.colorsService.findOne(+id);
  }

  @Post()
  create(@Body() color: Color): Promise<Color> {
    return this.colorsService.create(color);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() color: Partial<Color>,
  ): Promise<void> {
    return this.colorsService.update(+id, color);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.colorsService.remove(+id);
  }

  // Nouvelle route pour trouver des couleurs par condition
  @Get('search')
  findByCondition(@Query() query: Partial<Color>): Promise<Color[]> {
    return this.colorsService.findByCondition(query);
  }
}
