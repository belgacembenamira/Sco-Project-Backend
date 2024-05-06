import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcranAccueil } from './ecran-accueil.entity';
import { EcranAccueilService } from './ecran-accueil.service';
import { EcranAccueilController } from './ecran-accueil.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EcranAccueil])], // Import du repository
  providers: [EcranAccueilService], // Le service qui utilise le repository
  controllers: [EcranAccueilController], // Le contrôleur qui utilise le service
})
export class EcranAccueilModule {}
