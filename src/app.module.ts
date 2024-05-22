import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as cors from 'cors';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromoCodeModule } from './promo-code/promo-code.module';
import { SerialModule } from './serial/serial.module';
import { ClientModule } from './client/client.module'; // Correctement importé
import { EcranAccueilModule } from './ecran-accueil/ecran-accueil.module';
import { MessageAideModule } from './message-aide/message-aide.module';
import { TempsAttenteModule } from './TempsAttente/TempsAttente.module';
import { ManagerModule } from './Manager/Manager.module';
import { ModeReglementModule } from './ModeReglement/ModeReglement.module';
import { ColorModule } from './color/color.module';
import { EcranPanierModule } from './ecranPanier/ecranPanier.module';
import { FideliteModule } from './Fidelite/Fidelite.module';
import { CityModule } from './City/City.module';
import { OrderModule } from './order/order.module';
import { PrinterService } from './printer.service';

@Module({
  imports: [
    OrderModule,
    CityModule,

    EcranPanierModule,
    FideliteModule,
    ConfigModule.forRoot({
      isGlobal: true, // Permet que le module de configuration soit accessible partout
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Changez le type de base de données selon votre besoin
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')], // Charge toutes les entités
        synchronize: true, // Attention : utilisez-le uniquement pour le développement
      }),
    }),
    PromoCodeModule,
    SerialModule,
    ClientModule, // Correctement importé
    EcranAccueilModule, // Import du module complet
    TempsAttenteModule,
    MessageAideModule,
    ManagerModule,
    ModeReglementModule,
    ColorModule,
    ManagerModule,
    EcranPanierModule,
  ],
  controllers: [AppController],
  providers: [PrinterService,
AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Applique le middleware CORS à toutes les routes
    consumer.apply(cors()).forRoutes('*');
  }
}
