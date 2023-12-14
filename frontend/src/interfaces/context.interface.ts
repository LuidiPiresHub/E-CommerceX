import IProduct from './products.interface';

interface IContext {
  cartAmount: number;
  setCartAmount: React.Dispatch<React.SetStateAction<number>>;
  products: IProduct[];
  error: string | null;
  getProductByName: (name: string) => Promise<void>;
  getAllProducts: () => Promise<void>;
}

export default IContext;
