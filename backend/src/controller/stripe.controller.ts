import { Request, Response } from 'express';
import stripeService from '../services/stripe.services';
import { mapStatus } from '../utils/mapStatus';

const createStripeCheckoutSession = async (req: Request, res: Response) => {
  const { products } = req.body;
  const { type, message } = await stripeService.createStripeCheckoutSession(products);
  return res.status(mapStatus(type)).json({ message });
};

const webhook = async (req: Request, res: Response) => {
  const { type: eventType, data: { object: { id: sessionId } } } = req.body;
  const { type, message } = await stripeService.webhook(eventType, sessionId);
  return res.status(mapStatus(type)).send(message).end();
};

export default {
  createStripeCheckoutSession,
  webhook,
};
