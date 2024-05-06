import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageAide } from './message-aide.entity';
import { MessageAideService } from './message-aide.service';
import { MessageAideController } from './message-aide.controller';


@Module({
  imports: [TypeOrmModule.forFeature([MessageAide])], // Import du repository
  providers: [MessageAideService], // Le service qui utilise le repository
  controllers: [MessageAideController], // Le contrôleur qui utilise le service
})
export class MessageAideModule {}
