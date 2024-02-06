import { IStripeServices } from '../interfaces/stripe.interface';
import { Stripe } from 'stripe';
import dotenv from 'dotenv';
import { IProduct } from '../interfaces/stripe.interface';
import { createLineItems } from '../utils/stripeFunctions';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

const createStripeCheckoutSession = async (data: IProduct[]): Promise<IStripeServices> => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto'],
      line_items: createLineItems(data),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    });

    if (!session.url) return { type: 'BAD_REQUEST', message: 'Erro ao criar sessão de pagamento' };

    return { type: 'OK', message: session.url };
  } catch (error) {
    const errorCode = (error as Stripe.errors.StripeInvalidRequestError).code;
    if (errorCode === 'amount_too_large') {
      return { type: 'BAD_REQUEST', message: 'O limite da compra é de R$ 50.000' };
    }
    throw error;
  }
};

export default {
  createStripeCheckoutSession,
};
