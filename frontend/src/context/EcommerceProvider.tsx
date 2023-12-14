import { ReactNode, useEffect, useState } from 'react';
import EcommerceContext from './EcommerceContext';
import IProduct from '../interfaces/products.interface';

export default function EcommerceProvider({ children }: { children: ReactNode }) {
  const [cartAmount, setCartAmount] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const cartItens = JSON.parse(localStorage.getItem('cart')!) || [];
    setCartAmount(cartItens.length);
  }, []);

  const getAllProducts = async (): Promise<void> => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/products`);
      const { message } = await response.json();
      if (!response.ok) throw new Error(message);
      setProducts(message);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setProducts([]);
    }
  };

  const getProductByName = async (name: string): Promise<void> => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/products/search?name=${name}`);
      const { message } = await response.json();
      if (!response.ok) throw new Error(message);
      setProducts(message);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setProducts([]);
    }
  };

  const globalContent = {
    cartAmount,
    setCartAmount,
    products,
    error,
    getAllProducts,
    getProductByName,
  };

  return (
    <EcommerceContext.Provider value={globalContent}>
      {children}
    </EcommerceContext.Provider>
  );
}
