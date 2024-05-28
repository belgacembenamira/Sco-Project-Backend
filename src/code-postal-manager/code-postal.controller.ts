// code-postal.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CodePostalService } from './code-postal.service';
import { UpdateCodePostalDtoManager } from './dto/update-code-postal.dto';
import { CodePostalmanager } from './code-postal.entity';
import { CreateCodePostalDtoManger } from './dto/create-code-postal.dto';

@Controller('code-postal-manager')
export class CodePostalController {
  constructor(private readonly codePostalService: CodePostalService) {}

  @Post()
  async create(
    @Body() createCodePostalDto: CreateCodePostalDtoManger,
  ): Promise<CodePostalmanager> {
    return this.codePostalService.create(createCodePostalDto);
  }

  @Get()
  async findAll(): Promise<CodePostalmanager[]> {
    return this.codePostalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CodePostalmanager> {
    return this.codePostalService.findOne(id);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: number,
    @Body() updateCodePostalDto: UpdateCodePostalDtoManager,
  ): Promise<CodePostalmanager> {
    return this.codePostalService.patch(id, updateCodePostalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.codePostalService.remove(id);
  }
}
