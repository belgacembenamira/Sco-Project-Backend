import { Injectable } from '@nestjs/common';
import { SerialPort } from 'serialport';

@Injectable()
export class SerialService {
  private port: SerialPort | null = null;

  constructor() {
    // List available serial ports
    SerialPort.list()
      .then((ports) => {
        if (ports.length > 0) {
          // Create SerialPort object with correct options type
          this.port = new SerialPort({ path: 'COM4', baudRate: 9600 });
          console.log(`Port série connecté: ${this.port.path}`);
        } else {
          console.error('Aucun port série trouvé.');
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'initialisation du port série:", error);
      });
  }

  private sendLEDCommand(color: string, value: number) {
    const command = [
      0x02,
      0x1b,
      color === 'green' ? 0x20 : color === 'red' ? 0x21 : 0x22,
      value,
      0x03,
    ];

    this.port?.write(Buffer.from(command), (err) => {
      if (err) {
        console.error(
          `Erreur lors de l'envoi de la commande LED ${color}:`,
          err,
        );
      } else {
        console.log(`Commande LED ${color} envoyée avec succès.`);
      }
    });
  }

  sendData(data: number[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const buffer = Buffer.from(data);
      this.port?.write(buffer, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  turnOnLED(color: string) {
    this.sendLEDCommand(color, 0xc0);
  }

  turnOffLED(color: string) {
    this.sendLEDCommand(color, 0x00);
  }

  async onApplicationShutdown() {
    if (this.port) {
      await this.port.close();
      console.log('Port série fermé.');
    }
  }
}
