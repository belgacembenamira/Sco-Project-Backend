import { Controller, Post, Body, Get } from '@nestjs/common';
import { SerialService } from './serial.service';

@Controller('led')
export class SerialController {
  constructor(private readonly serialService: SerialService) {}

  // Existing methods (optional)
  @Post('green/on')
  turnOnGreenLED() {
    this.serialService.turnOnLED('green');
    return 'Green LED turned on.';
  }

  @Post('red/on')
  turnOnRedLED() {
    this.serialService.turnOnLED('red');
    return 'Red LED turned on.';
  }

  @Post('orange/on')
  turnOnOrangeLED() {
    this.serialService.turnOnLED('orange');
    return 'Orange LED turned on.';
  }

  @Post('off')
  turnOffLEDs() {
    this.serialService.turnOffLED('green');
    this.serialService.turnOffLED('red');
    this.serialService.turnOffLED('orange');
    return 'All LEDs turned off.';
  }
  // New method for turning on LED with color in body (single route)
  @Post('/on')
  turnOnLEDByColor(@Body() body: { color: string }) {
    const { color } = body;
    this.serialService.turnOnLED(color); // Assuming turnOnLED handles color validation
    return `${color.toUpperCase()} LED turned on.`;
  }
}
