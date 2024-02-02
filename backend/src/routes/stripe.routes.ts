import { Router } from 'express';
import stripeController from '../controller/stripe.controller';

const stripeRoutes = Router();

stripeRoutes.post('/create-checkout-session', stripeController.createStripeCheckoutSession);

export default stripeRoutes;
