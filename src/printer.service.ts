import { Injectable } from '@nestjs/common';
import {
  ThermalPrinter,
  PrinterTypes,
  CharacterSet,
  BreakLine,
} from 'node-thermal-printer';
import { Order } from './order/order.entity';
import { Payment } from './order/payment.entity';
import { Product } from './order/product.entity';

@Injectable()
export class PrinterService {
  private printer: ThermalPrinter;

  constructor() {
    this.printer = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: 'tcp://192.168.2.215',
      characterSet: CharacterSet.PC852_LATIN2,
      removeSpecialCharacters: false,
      lineCharacter: '=',
      width: 42, // Adjusted width to 42 characters
      breakLine: BreakLine.WORD,
    });
  }

  async printOrder(order: Order): Promise<void> {
    const isConnected = await this.printer.isPrinterConnected();
    if (!isConnected) {
      console.error('Printer is not connected');
      return;
    }

    try {
      this.printer.alignCenter();
      const currentDate = new Date();
      this.printer.bold(true);
      this.printer.println('Carrefour Market');
      this.printer.println('221-223, Oxford St, London W1D 2LJ');
      const formattedDate = `${currentDate.toLocaleDateString()} à ${currentDate.toLocaleTimeString()}`;
      this.printer.println(`Order  N° ${order.id} OF ${formattedDate}`);
      this.printer.bold(false);
      this.printer.newLine();

      this.printer.alignLeft();
      this.printer.drawLine();

      this.printer.println(`Order Origin:SKO`);
      this.printer.println(`IP Origin: Machine SKO 5`);

      const formattedTimestamp = this.formatTimestamp(order.horodatage);

      this.printer.println(
        `Total: ${order.totalttc.toFixed(2)} ${order.deviseCode}`,
      );
      this.printer.println(`Name Client: ${order.clientPhoneNumber}`);

      this.printer.drawLine();

      // Add table headers for products with vertical lines
      this.printer.tableCustom([
        { text: 'Product', align: 'LEFT', width: 0.5, bold: true },
        // { text: '||', align: 'CENTER', width: 0.05, bold: true },
        { text: 'Qty', align: 'CENTER', width: 0.1, bold: true },
        // { text: '||', align: 'CENTER', width: 0.05, bold: true },
        { text: 'Price', align: 'RIGHT', width: 0.3, bold: true },
      ]);
      this.printer.drawLine();

      order.lines.forEach((product: Product) => {
        const totalPrice = this.getPriceByProduct(product);

        this.printer.tableCustom([
          { text: product.title || 'N/A', align: 'LEFT', width: 0.5 },
          // { text: '||', align: 'CENTER', width: 0.05 },
          { text: product.qty.toString(), align: 'CENTER', width: 0.1 },
          // { text: '||', align: 'CENTER', width: 0.05 },
          {
            text: `${totalPrice.toFixed(2)} ${order.deviseCode}`,
            align: 'RIGHT',
            width: 0.3,
          },
        ]);
      });

      this.printer.drawLine();

      // Print Total Order Amount
      if (
        order.reglements.some((payment) => payment.paymentMode === 'fidMode')
      ) {
        // this.printer.println('Total Order Pay using your loyalty balance');
        this.printer.tableCustom([
          { text: 'Total', align: 'LEFT', width: 0.5 },
          {
            text: `${order.totalttc.toFixed(2)} ${order.deviseCode}`,
            align: 'RIGHT',
            width: 0.45,
          },
        ]);
        this.printer.tableCustom([
          { text: 'Fid', align: 'LEFT', width: 0.5 },
          {
            text: `-${order.totalttc.toFixed(2)} ${order.deviseCode}`,
            align: 'RIGHT',
            width: 0.45,
          },
        ]);
      } else {
        this.printer.bold(true);
        this.printer.tableCustom([
          { text: 'Total', align: 'LEFT', width: 0.5 },
          {
            text: `${order.totalttc.toFixed(2)} ${order.deviseCode}`,
            align: 'RIGHT',
            width: 0.45,
          },
        ]);
        this.printer.bold(false);
      }

      // Print Payment Information
      order.reglements.forEach((payment: Payment) => {
        if (payment.paymentMode === 'Bank card') {
          this.printer.tableCustom([
            { text: 'C.B', align: 'LEFT', width: 0.5 },
            // { text: '', align: 'CENTER', width: 0.05 },
            {
              text: `-${payment.paymentAmount.toFixed(2)} ${order.deviseCode}`,
              align: 'RIGHT',
              width: 0.45,
            },
          ]);
        }
        if (payment.paymentMode === 'At checkout') {
          this.printer.tableCustom([
            { text: 'ESB', align: 'LEFT', width: 0.5 },
            {
              text: `-${payment.paymentAmount.toFixed(2)} ${order.deviseCode}`,
              align: 'RIGHT',
              width: 0.45,
            },
          ]);
        }
      });

      // Print Remise if exists
      const totalRemise = order.lines.reduce(
        (sum, product) => sum + (product.remize || 0),
        0,
      );
      if (totalRemise > 0) {
        this.printer.tableCustom([
          { text: 'Total Remise', align: 'LEFT', width: 0.5 },
          { text: '', align: 'CENTER', width: 0.05 },
          {
            text: `${totalRemise.toFixed(2)} ${order.deviseCode}`,
            align: 'RIGHT',
            width: 0.45,
          },
        ]);
      }

      this.printer.drawLine();

      // Print Loyalty points
      order.reglements.forEach((payment: Payment) => {
        if (payment.Fidelity) {
          this.printer.println(
            `Loyalty points added to your account: ${payment.Fidelity}`,
          );
          this.printer.drawLine();
        }
      });

      this.printer.alignCenter();
      this.printer.println(`Thank you for your Order - See you soon`);

      // End with a line and finalize printing
      this.printer.cut();
      await this.printer.execute();
      this.printer.clear();

      console.log('Print done!');
    } catch (error) {
      console.error('Print failed:', error);
    }
  }

  private getPriceByProduct(product: Product): number {
    if (!product || !product.price || !product.price.advancedPrice) {
      console.error(
        'Product or product price is undefined or missing advancedPrice.',
      );
      return 0;
    }

    const { advancedPrice } = product.price;
    const firstPrice = Object.values(advancedPrice)[0];
    const totalPrice = firstPrice ? firstPrice.pricettc : 0;

    return totalPrice - (product.remize || 0);
  }

  private formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} à ${date.toLocaleTimeString()}`;
  }
}
