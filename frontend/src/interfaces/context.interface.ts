import IProduct from './products.interface';
import { Dispatch, SetStateAction } from 'react';

interface IContext {
  cartAmount: number;
  setCartAmount: Dispatch<SetStateAction<number>>;
  error: null | string;
  setError: Dispatch<SetStateAction<null | string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  addToCart: (product: IProduct) => void;
}

export default IContext;
