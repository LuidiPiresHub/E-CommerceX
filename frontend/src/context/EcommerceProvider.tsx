import { ReactNode, useEffect, useState } from 'react';
import EcommerceContext from './EcommerceContext';
import IProduct from '../interfaces/products.interface';
import api from '../axios/api';
import handleAxiosError from '../axios/handleAxiosError';
import { AxiosError } from 'axios';

export default function EcommerceProvider({ children }: { children: ReactNode }) {
  const [cartAmount, setCartAmount] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const cartItens = JSON.parse(localStorage.getItem('cart')!) || [];
    setCartAmount(cartItens.length);
  }, []);

  const getAllProducts = async (productName?: string): Promise<void> => {
    try {
      const url = productName ? `/products?name=${productName}` : '/products';
      const { data: { message } } = await api.get(url);
      setProducts(message);
      setError(null);
    } catch (error) {
      setProducts([]);
      handleAxiosError(error as AxiosError, setError);
    }
  };

  const globalContent = {
    cartAmount,
    setCartAmount,
    products,
    error,
    getAllProducts,
  };

  return (
    <EcommerceContext.Provider value={globalContent}>
      {children}
    </EcommerceContext.Provider>
  );
}
