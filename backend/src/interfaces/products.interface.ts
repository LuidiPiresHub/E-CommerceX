import { HttpStatus } from '../utils/mapStatus';
import { IStripeProduct } from './stripe.interface';

export interface IProduct extends IStripeProduct {
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductService {
  type: keyof typeof HttpStatus;
  message: string | IProduct[] | IProduct;
}
