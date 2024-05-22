// src/client/client.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

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

  async create(clientData: Partial<Client>): Promise<Client> {
    const client = this.clientRepository.create(clientData);
    return this.clientRepository.save(client);
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }

  async findOneByNumcl(nomcl: string): Promise<Client | undefined> {
    return this.clientRepository.findOne({ where: { nomcl: nomcl } });
  }
  async findByTelcl(telcl: string): Promise<Client | undefined> {
    return this.clientRepository.findOne({ where: { telcl } });
  }
  async update(
    id: number,
    clientData: Partial<Client>,
  ): Promise<Client | undefined> {
    await this.clientRepository.update(id, clientData);
    return this.clientRepository.findOne({ where: { id } });
  }
  async updateByTelcl(
    telcl: string,
    clientData: Partial<Client>,
  ): Promise<Client> {
    try {
      // Recherchez le client en fonction du numéro de téléphone
      const client = await this.clientRepository.findOne({ where: { telcl } });

      // Vérifiez si le client existe
      if (!client) {
        throw new Error('Client not found');
      }

      // Mettez à jour les données du client avec les nouvelles données
      Object.assign(client, clientData);

      // Sauvegardez les modifications dans la base de données
      return this.clientRepository.save(client);
    } catch (error) {
      throw new Error(`Error updating client by telcl: ${error.message}`);
    }
  }
  async updateClientBalance(
    telcl: string,
    montantSoldeCompteClient: number,
  ): Promise<void> {
    const client = await this.clientRepository.findOne({
      where: { telcl: telcl },
    });
    if (!client) {
      throw new Error('Client not found');
    }

    client.montantSoldeCompteClient = montantSoldeCompteClient; // Mettez à jour le solde avec le montant spécifié
    await this.clientRepository.save(client);
  }
  async addFidelityToClientBalance(
    telcl: string,
    fidelityToAdd: number,
  ): Promise<void> {
    const client = await this.clientRepository.findOne({
      where: { telcl: telcl },
    });
    if (!client) {
      throw new Error('Client not found');
    }

    client.montantSoldeCompteClient += fidelityToAdd;
    console.log(client.montantSoldeCompteClient);
    await this.clientRepository.save(client);
  }
  async findByNumeroCardfid(
    numeroCardfid: number,
  ): Promise<{ montantSoldeCompteClient: number; telcl: string } | undefined> {
    const client = await this.clientRepository.findOne({
      where: { numberCardfid: numeroCardfid },
    });
    if (!client) {
      throw new Error('Client not found');
    }
    return {
      montantSoldeCompteClient: client.montantSoldeCompteClient,
      telcl: client.telcl,
    };
  }
}
