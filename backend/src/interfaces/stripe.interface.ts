import { HttpStatus } from '../utils/mapStatus';

export interface IStripeServices {
  type: keyof typeof HttpStatus;
  message: string;
}

export interface IStripeProduct {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}
