import productsService from './products.services';
import { Stripe } from 'stripe';
import { createLineItems } from '../utils/stripeFunctions';
import { IStripeProduct, IStripeServices } from '../interfaces/stripe.interface';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

const createStripeCheckoutSession = async (products: IStripeProduct[], userId: string): Promise<IStripeServices> => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto'],
      line_items: createLineItems(products),
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['BR'],
      },
      phone_number_collection: {
        enabled: true,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'brl',
            },
            display_name: 'Entrega Grátis',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1999,
              currency: 'brl',
            },
            display_name: 'Entrega Expressa',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 2,
              },
            },
          },
        },
      ],
      metadata: { userId },
      success_url: `${process.env.CLIENT_URL}/purchases?fromPayment=true`,
      cancel_url: `${process.env.CLIENT_URL}`,
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

const webhook = async (eventType: string, sessionId: string): Promise<IStripeServices> => {
  try {
    if (eventType === 'checkout.session.completed') {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const userId = session.metadata?.userId;
      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
      const products = await Promise.all(lineItems.data.map(async (item) => {
        const product = await stripe.products.retrieve(item.price!.product as string);
        return {
          id: product.metadata.productId,
          title: product.name,
          thumbnail: product.images[0],
          price: item.price!.unit_amount!,
          quantity: item.quantity!,
        };
      }));
      return productsService.createProduct(products, userId!) as Promise<IStripeServices>;
    }
    return { type: 'NOT_FOUND', message: `Evento "${eventType}" não é tratado pelo webhook` };
  } catch {
    return { type: 'INTERNAL', message: 'Erro interno no sistema' };
  }
};

export default {
  createStripeCheckoutSession,
  webhook,
};
