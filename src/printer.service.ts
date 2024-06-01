import { Body, Get, Injectable, Post, Res } from '@nestjs/common';
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

      this.printer.println(`Order Origin: SKO`);
      this.printer.println(`IP Origin: Machine SKO 5`);

      const formattedTimestamp = this.formatTimestamp(order.horodatage);

      // Print total and payment details
      this.printer.tableCustom([
        {
          text: `Total: ${order.totalttc.toFixed(2)} ${order.deviseCode}`,
          align: 'LEFT',
          width: 0.45,
        },
      ]);

      // Print client name if available
      if (order.clientPhoneNumber) {
        this.printer.println(`Client Name: ${order.clientPhoneNumber}`);
      }

      this.printer.drawLine();

      // Table headers for products with vertical lines
      this.printer.tableCustom([
        { text: 'Product', align: 'LEFT', width: 0.5, bold: true },
        { text: 'Qty', align: 'CENTER', width: 0.1, bold: true },
        { text: 'Price', align: 'RIGHT', width: 0.3, bold: true },
      ]);
      this.printer.drawLine();

      // Print each product line item
      order.lines.forEach((product: Product) => {
        const totalPrice = this.getPriceByProduct(product);

        this.printer.tableCustom([
          { text: product.title || 'N/A', align: 'LEFT', width: 0.5 },
          { text: product.qty.toString(), align: 'CENTER', width: 0.1 },
          {
            text: `${totalPrice.toFixed(2)} ${order.deviseCode}`,
            align: 'RIGHT',
            width: 0.3,
          },
        ]);
      });

      this.printer.drawLine();

      // Determine payment modes
      const containsFid = order.reglements.some(
        (payment) => payment.paymentMode === 'fidMode',
      );
      const containsBankCard = order.reglements.some(
        (payment) => payment.paymentMode === 'Bank card',
      );
      const containsCash = order.reglements.some(
        (payment) => payment.paymentMode === 'Cash',
      );

      // Print based on payment scenarios
      if (containsFid) {
        // Case 1: Payment with fidelity points and either Bank card or Cash
        this.printer.tableCustom([
          { text: 'Total', align: 'LEFT', width: 0.5 },
          {
            text: `${order.totalttc.toFixed(2)} ${order.deviseCode}`,
            align: 'RIGHT',
            width: 0.45,
          },
        ]);
        this.printer.tableCustom([
          { text: 'C.Fid', align: 'LEFT', width: 0.5 },
          {
            text: `-${order.totalttc.toFixed(2)} ${order.deviseCode}`,
            align: 'RIGHT',
            width: 0.45,
          },
        ]);
        if (containsBankCard) {
          this.printer.tableCustom([
            { text: 'C.B', align: 'LEFT', width: 0.5 },
            {
              text: `-${order.ResteAPayer.toFixed(2)} ${order.deviseCode}`,
              align: 'RIGHT',
              width: 0.45,
            },
          ]);
        } else if (containsCash) {
          this.printer.tableCustom([
            { text: 'ESP', align: 'LEFT', width: 0.5 },
            {
              text: `-${order.ResteAPayer.toFixed(2)} ${order.deviseCode}`,
              align: 'RIGHT',
              width: 0.45,
            },
          ]);
        }
      } else {
        // Case 2: Either Bank card or Cash without fidelity points
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
        if (containsBankCard) {
          this.printer.tableCustom([
            { text: 'C.B', align: 'LEFT', width: 0.5 },
            {
              text: `-${order.ResteAPayer.toFixed(2)} ${order.deviseCode}`,
              align: 'RIGHT',
              width: 0.45,
            },
          ]);
        } else if (containsCash) {
          this.printer.tableCustom([
            { text: 'ESP', align: 'LEFT', width: 0.5 },
            {
              text: `-${order.ResteAPayer.toFixed(2)} ${order.deviseCode}`,
              align: 'RIGHT',
              width: 0.45,
            },
          ]);
        }
        this.printer.drawLine();
      }

      // Case 3: Partial payment with C.B after accessing fidelity points
      if (containsBankCard && containsFid) {
        this.printer.tableCustom([
          { text: 'C.B', align: 'LEFT', width: 0.5 },
          {
            text: `-${order.ResteAPayer.toFixed(2)} ${order.deviseCode}`,
            align: 'RIGHT',
            width: 0.45,
          },
        ]);
      }

      // Case 4: Partial payment with ESP after accessing fidelity points
      if (containsCash && containsFid) {
        this.printer.tableCustom([
          { text: 'ESP', align: 'LEFT', width: 0.5 },
          {
            text: `-${order.ResteAPayer.toFixed(2)} ${order.deviseCode}`,
            align: 'RIGHT',
            width: 0.45,
          },
        ]);
      }

      // Thank you message
      this.printer.alignCenter();
      this.printer.println(`Thank you for your Order - See you soon`);

      // Finalize printing
      this.printer.cut();
      await this.printer.execute();
      this.printer.clear();

      console.log('Print done!');
    } catch (error) {
      console.error('Print failed:', error);
    }
  }

  // @Post('/banque')
  // async printTicketBanque(@Body() Data: any) {
  //   let lastPrintableIndex = Data.TicketContenu.length - 1;
  //   while (
  //     lastPrintableIndex >= 0 &&
  //     Data.TicketContenu.charCodeAt(lastPrintableIndex) < 32
  //   ) {
  //     lastPrintableIndex--;
  //   }

  //   // Extraire la sous-chaîne avec les caractères imprimables
  //   const cleanTicketContenu = Data.TicketContenu.substring(
  //     0,
  //     lastPrintableIndex + 1,
  //   );

  //   // console.log(cleanTicketContenu);
  //   try {
  //     this.printer.println(cleanTicketContenu);
  //     this.printer.cut();

  //     this.printer.execute();
  //     console.log('Print done!');
  //     this.printer.clear();
  //     this.printOrder(Data);
  //   } catch (error) {
  //     console.error('Print failed:', error);
  //   }
  // }
  // @Get('/test')
  // test() {
  //   return 'hello';
  // }

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
