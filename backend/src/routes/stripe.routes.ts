import { Router } from 'express';
import stripeController from '../controller/stripe.controller';
import validateToken from '../middlewares/validadeToken';

const stripeRoutes = Router();

stripeRoutes.post('/create-checkout-session', validateToken, stripeController.createStripeCheckoutSession);

stripeRoutes.post('/webhook', stripeController.webhook);

export default stripeRoutes;
