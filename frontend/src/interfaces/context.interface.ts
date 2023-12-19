import IProduct from './products.interface';

interface IContext {
  cartAmount: number;
  setCartAmount: React.Dispatch<React.SetStateAction<number>>;
  products: IProduct[];
  error: string | null;
  getAllProducts: (productName?: string) => Promise<void>;
}

export default IContext;
