import { ReactNode, useEffect, useState } from 'react';
import EcommerceContext from './EcommerceContext';
import { IProduct, IProductCart } from '../interfaces/products.interface';
import { countCartItems } from '../utils/functions';
import { toast } from 'react-toastify';
import { IBackendCheckoutResponse, IBackendResponseError } from '../interfaces/server.interface';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';

export default function EcommerceProvider({ children }: { children: ReactNode }) {
  const [cartAmount, setCartAmount] = useState<number>(0);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const checkout = async (products: IProductCart[]): Promise<void> => {
    if (products.length) {
      try {
        setIsLoading(true);
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const { data: { message: redirectUrl } } = await axios.post<IBackendCheckoutResponse>(`${backendUrl}/stripe/create-checkout-session`, { products }, { withCredentials: true });
        window.location.href = redirectUrl;
      } catch (error) {
        const errorMessage = (error as AxiosError).message === 'Network Error'
          ? 'Erro de conexão com o servidor'
          : (error as IBackendResponseError).response.data.message || 'Ocorreu um erro interno';
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
          footer: 'Por favor, tente novamente mais tarde.',
        });
      } finally {
        setIsLoading(false);
      }
    }
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
    checkout,
  };

  return (
    <EcommerceContext.Provider value={globalContent}>
      {children}
    </EcommerceContext.Provider>
  );
}
