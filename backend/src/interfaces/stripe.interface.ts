import { HttpStatus } from '../utils/mapStatus';

export interface IStripeServices {
  type: keyof typeof HttpStatus;
  message: string;
}

export interface IProduct {
  id: string;
  title: string;
  price: number | string;
  thumbnail: string;
  quantity: number;
}
