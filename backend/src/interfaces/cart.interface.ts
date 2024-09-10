import { cart } from '@prisma/client';
import { HttpStatus } from '../utils/mapStatus';

type type = keyof typeof HttpStatus;

export interface IGetCartItems {
  type: type
  message: cart[] | string;
}

export interface ICartProduct {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

export interface ICreateCartItem {
  type: type;
  message: cart | string;
}

export interface IUpdateCartQuantity {
  type: type;
  message: cart | string;
}

export interface IDeleteCart {
  type: type;
  message: string;
}
