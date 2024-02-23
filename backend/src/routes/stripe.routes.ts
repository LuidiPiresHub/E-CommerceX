import { Router } from 'express';
import stripeController from '../controller/stripe.controller';
import validateToken from '../middlewares/validadeToken';
import validadeStripeProducts from '../middlewares/validadeStripeProducts';

const stripeRoutes = Router();

stripeRoutes.post(
  '/create-checkout-session',
  validateToken,
  validadeStripeProducts,
  stripeController.createStripeCheckoutSession
);

stripeRoutes.post('/webhook', stripeController.webhook);

export default stripeRoutes;
