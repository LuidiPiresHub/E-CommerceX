import { ReactNode, useEffect, useState } from 'react';
import EcommerceContext from './EcommerceContext';
import { IProduct } from '../interfaces/products.interface';
import { countCartItems } from '../utils/functions';
import { toast } from 'react-toastify';

export default function EcommerceProvider({ children }: { children: ReactNode }) {
  const [cartAmount, setCartAmount] = useState<number>(0);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const cartItens = JSON.parse(localStorage.getItem('cart')!) || [];

  const addToCart = (product: IProduct): void => {
    const existingProductIndex = cartItens.findIndex((item: IProduct) => item.id === product.id);
    if (existingProductIndex !== -1) {
      cartItens[existingProductIndex].quantity += 1;
    } else {
      cartItens.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cartItens));
    setCartAmount(countCartItems(cartItens));
    toast.success('Item adicionado ao carrinho!', {
      position: 'top-left',
      autoClose: 2000,
    });
  };

  useEffect(() => {
    setCartAmount(countCartItems(cartItens));
  }, []);

  const globalContent = {
    cartAmount,
    setCartAmount,
    error,
    setError,
    isLoading,
    setIsLoading,
    addToCart,
  };

  return (
    <EcommerceContext.Provider value={globalContent}>
      {children}
    </EcommerceContext.Provider>
  );
}
