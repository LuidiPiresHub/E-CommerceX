import { HttpStatus } from '../utils/mapStatus';

export interface IStripeServices {
  type: keyof typeof HttpStatus;
  message: string;
}

export interface IStripeProduct {
  cart_product_id: string;
  cart_product_title: string;
  cart_product_price: number;
  cart_product_quantity: number;
  cart_product_thumbnail: string;
}
