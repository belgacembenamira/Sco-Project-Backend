import { Injectable } from "@nestjs/common";
import { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } from "node-thermal-printer";
import path from "path";
import { Order } from "./order/order.entity";
import { Payment } from "./order/payment.entity";
import { Product } from "./order/product.entity";

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
      this.printer.bold(true);
      this.printer.println('Order Details');
      this.printer.bold(false);
      this.printer.newLine();

      this.printer.alignLeft();
      this.printer.println(`Order ID: ${order.id}`);
      this.printer.println(`Order Origin: ${order.orderOrigine}`);
      this.printer.println(`IP Origin: ${order.ipOrigine}`);
      this.printer.println(`Timestamp: ${order.horodatage}`);
      this.printer.println(
        `Total: ${order.totalttc.toFixed(2)} ${order.deviseCode}`,
      );
      this.printer.println(`Client Phone: ${order.clientPhoneNumber}`);
      this.printer.drawLine();

      // Print Products table
      this.printer.tableCustom([
        { text: 'Product', align: 'LEFT', width: 0.4, bold: true },
        { text: 'Qty', align: 'CENTER', width: 0.1, bold: true },
        { text: 'Price', align: 'RIGHT', width: 0.2, bold: true },
        { text: 'Remise', align: 'RIGHT', width: 0.2, bold: true },
      ]);

      order.lines.forEach((product: Product) => {
        const totalPrice = this.getPriceByProduct(product);
        this.printer.tableCustom([
          { text: product.title || 'N/A', align: 'LEFT', width: 0.4 },
          { text: product.qty.toString(), align: 'CENTER', width: 0.1 },
          {
            text: `${totalPrice.toFixed(2)} ${order.deviseCode}`,
            align: 'RIGHT',
            width: 0.2,
          },
          {
            text: `${product.remize || 0}`,
            align: 'RIGHT',
            width: 0.2,
          },
        ]);
      });

      this.printer.drawLine();

      // Print Total Order Amount
      this.printer.bold(true);
      this.printer.println(
        `Total Order Amount: ${order.totalttc.toFixed(2)} ${order.deviseCode}`,
      );
      this.printer.bold(false);

      // Print Remise if exists
      const totalRemise = order.lines.reduce(
        (sum, product) => sum + (product.remize || 0),
        0,
      );
      if (totalRemise > 0) {
        this.printer.println(
          `Total Remise: ${totalRemise.toFixed(2)} ${order.deviseCode}`,
        );
      }

      this.printer.drawLine();

      // Print Payments table
      order.reglements.forEach((payment: Payment) => {
        const finalPaymentAmount =
          payment.paymentMode === 'CB'
            ? payment.paymentAmount - (payment.data.renderAmount || 0)
            : payment.paymentAmount;

        // Print each field on a separate line
        this.printer.println(`Payment Mode: ${payment.paymentMode}`);
        this.printer.println(`UUID: ${payment.paymentModeUuiD}`);
        this.printer.println(`Fidelity: ${payment.Fidelity}`);
        this.printer.println(
          `Amount: ${payment.paymentAmount.toFixed(2)} ${order.deviseCode}`,
        );
        this.printer.println(
          `Total: ${finalPaymentAmount.toFixed(2)} ${order.deviseCode}`,
        );
        this.printer.drawLine();
      });

      // End with a line and finalize printing
      this.printer.println('Thank you for your purchase!');
      this.printer.cut();
      this.printer.execute();
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

    const finalPrice = totalPrice - (product.remize || 0);

    return finalPrice;
  }

  // private async generateQRCode(orderId: string): Promise<string | null> {
  //   try {
  //     const qr = require('qrcode');
  //     const qrData = `Order ID: ${orderId}`;
  //     const qrImageBuffer = await qr.toBuffer(qrData, {
  //       errorCorrectionLevel: 'H',
  //     });

  //     const qrImagePath = path.join(__dirname, `order_${orderId}.png`);
  //     fs.writeFileSync(qrImagePath, qrImageBuffer);

  //     return qrImagePath;
  //   } catch (error) {
  //     console.error('Failed to generate QR code:', error);
  //     return null;
  //   }
  // }
}
