import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request, Response } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('checkout-session')
  async createCheckoutSession(
    @Body()
    sessionDto: {
      amount: number;
      currency: string;
      successUrl: string;
      cancelUrl: string;
    },
    @Res() response: Response,
  ) {
    try {
      const session = await this.stripeService.createCheckoutSession(
        sessionDto.amount,
        sessionDto.currency,
        sessionDto.successUrl,
        sessionDto.cancelUrl,
      );
      return response.json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error.message);
      return response
        .status(500)
        .json({ error: 'Failed to create checkout session' });
    }
  }

  // @Post('webhook')
  // async handleWebhook(@Req() request: Request, @Res() response: Response) {
  //   const sig = request.headers['stripe-signature'];
  //   let event;

  //   try {
  //     event = this.stripeService.constructEvent(
  //       Buffer.from((request as any).rawBody),
  //       sig,
  //     );
  //   } catch (err) {
  //     console.error(`⚠️  Webhook signature verification failed.`, err.message);
  //     return response.status(400).send(`Webhook Error: ${err.message}`);
  //   }

  //   // Handle the event
  //   switch (event.type) {
  //     case 'checkout.session.completed':
  //       const session = event.data.object;
  //       // Handle successful payment here
  //       await this.stripeService.handleCheckoutSessionCompleted(session);
  //       break;
  //     default:
  //       console.log(`Unhandled event type ${event.type}`);
  //   }

  //   response.status(200).send();
  // }
}
