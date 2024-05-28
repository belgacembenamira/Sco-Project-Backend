import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrinterService } from './printer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly printerService: PrinterService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/test')
  test() {
    return this.printerService.test();
  }
  @Post('/banque')
  printer(@Body() Data: any) {
    return this.printerService.printTicketBanque(Data);
  }
}
