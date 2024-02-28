/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 18/02/2024 - 23:20:07
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/02/2024
    * - Author          : belgacem
    * - Modification    : 
**/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
