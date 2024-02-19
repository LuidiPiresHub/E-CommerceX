import { Router } from 'express';
import stripeController from '../controller/stripe.controller';

const stripeRoutes = Router();

stripeRoutes.post('/create-checkout-session', stripeController.createStripeCheckoutSession);

stripeRoutes.post('/webhook', stripeController.webhook);

export default stripeRoutes;
