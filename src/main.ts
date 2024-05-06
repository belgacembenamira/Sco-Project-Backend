import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SKO API Documentation')
    .setDescription('Documentation pour SKO API')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api', app, swaggerDocument);

  // Servir les fichiers statiques depuis le dossier "uploads"
  app.use('../ScoProject/uploads', express.static('uploads'));

  // Écouter sur le port 5000
  await app.listen(5000);
}

bootstrap();
