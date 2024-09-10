import { Dispatch, SetStateAction } from 'react';
import { ICart } from './cart.interface';
import { IProduct } from './products.interface';

export interface CartContextType {
  cart: ICart[];
  setCart: Dispatch<SetStateAction<ICart[]>>;
  checkout: (products: ICart[], redirectUrl?: string) => Promise<void>;
  setCartAmount: Dispatch<SetStateAction<number>>;
  cartAmount: number;
  isLoading: boolean;
  throttledAddToCart: (product: IProduct) => void;
}
