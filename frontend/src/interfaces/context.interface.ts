import IProduct from './products.interface';

interface IContext {
  fetchData: (query?: string) => Promise<void>;
  products: IProduct[];
  error: null | string;
  cartAmount: number;
  setCartAmount: React.Dispatch<React.SetStateAction<number>>;
}

export default IContext;
