import express, { Request, Response, Router } from 'express';
import stripeController from '../controller/stripe.controller';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripeRoutes = Router();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

stripeRoutes.post('/create-checkout-session', stripeController.createStripeCheckoutSession);

stripeRoutes.post('/webhook', express.json({ type: 'application/json' }), async (req: Request, res: Response) => {
  try{
    const eventType = req.body.type;
    if (eventType === 'checkout.session.completed') {
      const session = req.body.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const cartItems = await Promise.all(lineItems.data.map(async (item) => {
        const product = await stripe.products.retrieve(item.price!.product as string);
        return {
          id: product.metadata.productId,
          title: product.name,
          thumbnail: product.images[0],
          price: item.price!.unit_amount,
          quantity: item.quantity,
        };
      }));
      res.status(200).json({ type: null, message: cartItems });
    }
  } catch (error) {
    return res.status(400).end();
  }
});

export default stripeRoutes;
