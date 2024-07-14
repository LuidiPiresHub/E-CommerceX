import { IProduct, IProductCart } from './products.interface';
import { Dispatch, SetStateAction } from 'react';

export interface GlobalContextType {
  cartAmount: number;
  setCartAmount: Dispatch<SetStateAction<number>>;
  error: null | string;
  setError: Dispatch<SetStateAction<null | string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  addToCart: (product: IProduct) => void;
  checkout: (cart: IProductCart[]) => void;
}
