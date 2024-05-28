// src/client/client.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client | undefined> {
    return this.clientRepository.findOne({ where: { id } });
  }

  async create(clientData: CreateClientDto): Promise<Client> {
    const newClient = this.clientRepository.create(clientData);
    return this.clientRepository.save(newClient);
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }

  async findByTelcl(telcl: string): Promise<Client | undefined> {
    return this.clientRepository.findOne({ where: { telcl } });
  }

  // Update method in ClientService
  async update(id: number, clientData: Partial<Client>): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new Error(`Client with ID ${id} not found`);
    }

    // Update only the fields that are provided in clientData
    if (clientData.telcl !== undefined) {
      client.telcl = clientData.telcl;
    }
    if (clientData.nomcl !== undefined) {
      client.nomcl = clientData.nomcl;
    }
    if (clientData.numberCardfid !== undefined) {
      client.numberCardfid = clientData.numberCardfid;
    }
    if (clientData.montantSoldeCompteClient !== undefined) {
      client.montantSoldeCompteClient = clientData.montantSoldeCompteClient;
    }

    await this.clientRepository.save(client);
    return client;
  }
  async updateClientBalance(
    telcl: string,
    montantSoldeCompteClient: number,
  ): Promise<void> {
    const client = await this.clientRepository.findOne({ where: { telcl } });
    if (!client) {
      throw new Error('Client not found');
    }

    client.montantSoldeCompteClient = montantSoldeCompteClient;
    await this.clientRepository.save(client);
  }

  async addFidelityToClientBalance(
    telcl: string,
    fidelityToAdd: number,
  ): Promise<void> {
    const client = await this.clientRepository.findOne({ where: { telcl } });
    if (!client) {
      throw new Error('Client not found');
    }

    client.montantSoldeCompteClient += fidelityToAdd;
    await this.clientRepository.save(client);
  }

  async findByNumeroCardfid(numeroCardfid: string): Promise<{
    montantSoldeCompteClient: number;
    telcl: string;
    nomcl: string;
  }> {
    const client = await this.clientRepository.findOne({
      where: { numberCardfid: numeroCardfid },
    });
    if (!client) {
      throw new Error('Client not found');
    }
    return {
      montantSoldeCompteClient: client.montantSoldeCompteClient,
      telcl: client.telcl,
      nomcl: client.nomcl,
    };
  }

  async createClientManger(clientData: CreateClientDto): Promise<Client> {
    clientData.montantSoldeCompteClient = 0;
    const newClient = this.clientRepository.create(clientData);
    return this.clientRepository.save(newClient);
  }
}
