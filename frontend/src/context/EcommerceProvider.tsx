import { ReactNode, useEffect, useState } from 'react';
import EcommerceContext from './EcommerceContext';
import IProduct from '../interfaces/products.interface';

export default function EcommerceProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [cartAmount, setCartAmount] = useState<number>(0);

  // console.log('provider', products);

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

  useEffect(() => {
    const cartItens = JSON.parse(localStorage.getItem('cart')!) || [];
    setCartAmount(cartItens.length);
  }, []);

  const globalContent = {
    fetchData,
    products,
    error,
    cartAmount,
    setCartAmount,
  };

  return (
    <EcommerceContext.Provider value={globalContent}>
      {children}
    </EcommerceContext.Provider>
  );
}
