import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FideliteService } from './fidelite.service';
import { FideliteController } from './fidelite.controller';
import { Fidelite } from './fidelite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fidelite])],
  providers: [FideliteService],
  controllers: [FideliteController],
})
export class FideliteModule {}
