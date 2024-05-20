import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeReglementController } from './ModeReglement.controller';
import { ModeReglementService } from './ModeReglement.service';
import { ModeReglement } from './ModeReglement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModeReglement])],
  providers: [ModeReglementService],
  controllers: [ModeReglementController],
})
export class ModeReglementModule {}
