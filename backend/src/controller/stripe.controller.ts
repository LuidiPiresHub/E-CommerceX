import { Request, Response } from 'express';
import productsServices from '../services/stripe.services';
import { mapStatus } from '../utils/mapStatus';

const createStripeCheckoutSession = async (req: Request, res: Response) => {
  const { type, message } = await productsServices.createStripeCheckoutSession(req.body);
  return res.status(mapStatus(type)).json({ message });
};

export default {
  createStripeCheckoutSession,
};
