import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    });
  }

  async createCheckoutSession(
    amount: number,
    currency: string,
    successUrl: string,
    cancelUrl: string,
  ) {
    try {
      console.log('Creating checkout session...');
      console.log('Amount:', amount);
      console.log('Currency:', currency);
      console.log('Success URL:', successUrl);
      console.log('Cancel URL:', cancelUrl);

      // Convert amount to cents
      const amountInCents = Math.round(amount * 100);

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: 'Total Amount',
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      console.log('Checkout session created:', session);

      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error.message);
      throw new Error('Error creating checkout session');
    }
  }

  async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    try {
      console.log('Handling checkout session completion...');
      console.log('Session ID:', session.id);
      console.log('Payment status:', session.payment_status);
      console.log('Amount total:', session.amount_total);

      // Handle successful payment logic here
      console.log('Payment was successful:', session);
    } catch (error) {
      console.error(
        'Error handling checkout session completion:',
        error.message,
      );
      throw new Error('Error handling checkout session completion');
    }
  }
}
