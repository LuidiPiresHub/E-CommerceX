import { HttpStatus } from '../utils/mapStatus';
import { IStripeProduct } from './stripe.interface';

export interface IProduct extends IStripeProduct {
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductFavorite {
  id: string;
  users_id: string | null;
  favorited_product_name: string;
  favorited_product_price: number;
  favorited_product_thumbnail: string;
  created_at: Date;
  updated_at: Date;
}

export interface IProductService {
  type: keyof typeof HttpStatus;
  message: string | IProduct[] | IProduct | boolean | IProductFavorite[];
}

export interface IProductDetail {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}
