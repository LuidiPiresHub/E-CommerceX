import IProduct from './products.interface';

interface IContext {
  fetchData: (query?: string) => Promise<void>;
  products: IProduct[];
  error: null | string;
}

export default IContext;
