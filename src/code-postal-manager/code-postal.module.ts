import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodePostalController } from './code-postal.controller';
import { CodePostalService } from './code-postal.service';
import {  CodePostalmanager } from './code-postal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CodePostalmanager])],
  providers: [CodePostalService],
  controllers: [CodePostalController],
})
export class CodePostalModule {}
