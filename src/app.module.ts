import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as cors from 'cors';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './categories/categories.module';
import { PromoCodeModule } from './promo-code/promo-code.module';
import { SerialModule } from './serial/serial.module';
import { ClientModule } from './client/client.module'; // Correctement importé
import { EcranAccueilModule } from './ecran-accueil/ecran-accueil.module';
import { MessageAideModule } from './message-aide/message-aide.module';
import { TempsAttenteModule } from './TempsAttente/TempsAttente.module';

@Module({
  imports: [
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
    ProductModule,
    CategoryModule,
    PromoCodeModule,
    SerialModule,
    ClientModule, // Correctement importé
    EcranAccueilModule, // Import du module complet
    TempsAttenteModule,
    MessageAideModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Applique le middleware CORS à toutes les routes
    consumer.apply(cors()).forRoutes('*');
  }
}
