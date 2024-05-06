import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageAideController } from './message-aide.controller';
import { MessageAideService } from './message-aide.service';
import { MessageAide } from './message-aide.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageAide])], // Assurez-vous que l'entité est incluse
  controllers: [MessageAideController],
  providers: [MessageAideService], // Déclare le service comme provider
  exports: [MessageAideService], // Exportez le service s'il doit être utilisé ailleurs
})
export class MessageAideModule {}
