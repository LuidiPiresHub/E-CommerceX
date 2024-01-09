import IProduct from './products.interface';
import { Dispatch, SetStateAction } from 'react';

interface IContext {
  cartAmount: number;
  setCartAmount: Dispatch<SetStateAction<number>>;
  products: IProduct[];
  getAllProductsByName: (productName?: string) => Promise<void>;
  pageCount: number;
  setPageCount: Dispatch<SetStateAction<number>>;
  error: null | string;
  setError: Dispatch<SetStateAction<null | string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  limit: number;
}

export default IContext;
