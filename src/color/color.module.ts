import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './color.entity';
import { ColorsService } from './color.service';
import { ColorsController } from './color.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  providers: [ColorsService],
  controllers: [ColorsController],
})
export class ColorModule {}
