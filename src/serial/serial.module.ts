// serial.module.ts
import { Module } from '@nestjs/common';
import { SerialService } from './serial.service';
import { SerialController } from './serial.controller';
@Module({
  providers: [SerialService],
  exports: [SerialService],
  controllers: [SerialController],
})
export class SerialModule {}
