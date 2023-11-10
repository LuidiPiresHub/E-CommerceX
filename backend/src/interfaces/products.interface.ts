import { HttpStatus } from '../utils/mapStatus';

export interface IProduct {
  id?: number;
  productName: string;
  price: number;
  description: string;
  productImage: string;
  sellerId: number;
}

export interface IService {
  type: keyof typeof HttpStatus;
  message: string | IProduct[] | IProduct;
}
