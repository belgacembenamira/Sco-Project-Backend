import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from '../client/client.service';
import { Client } from '../client/client.entity';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private jwtService: JwtService,
  ) {}

  async validateClient(nomcl: string): Promise<Client | null> {
    return this.clientService.findOneByNumcl(nomcl);
  }

  async login(client: Client): Promise<{ access_token: string }> {
    const payload = { numcl: client.nomcl, sub: client.id }; // Change numcl en nomcl
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
