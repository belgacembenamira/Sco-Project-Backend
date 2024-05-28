// src/order/order.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './create-order.dto';
import { PrinterService } from '../printer.service'; // Importer le service d'impression

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly printerService: PrinterService, // Injecter le service d'impression
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<void> {
    try {
      // Créer la commande
      const newOrder = await this.orderService.create(createOrderDto);

      // Imprimer les détails de la commande
      await this.printerService.printOrder(newOrder);
    } catch (error) {
      // Gérer l'erreur
      console.error(
        'Erreur lors de la création et impression de la commande:',
        error,
      );
      throw error;
    }
  }


  
}
