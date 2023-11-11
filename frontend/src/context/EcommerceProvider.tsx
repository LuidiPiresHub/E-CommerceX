import { ReactNode, useState } from 'react';
import EcommerceContext from './EcommerceContext';
import IProduct from '../interfaces/products.interface';

export default function EcommerceProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<null | string>(null);

  console.log('provider', products);

  const fetchData = async (query?: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/products?q=${query}`);
      const { message } = await response.json();
      if (!response.ok) throw new Error(message);
      setProducts(message);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const globalContent = {
    fetchData,
    products,
    error,
  };

  return (
    <EcommerceContext.Provider value={globalContent}>
      {children}
    </EcommerceContext.Provider>
  );
}
