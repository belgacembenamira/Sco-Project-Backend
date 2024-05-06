import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'; // Assurez-vous d'importer JwtStrategy

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, JwtStrategy], // Enregistrez JwtStrategy dans les providers
  exports: [AuthService],
})
export class AuthModule {}
