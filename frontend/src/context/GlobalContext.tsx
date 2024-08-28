import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { IProduct, IProductCart } from '../interfaces/products.interface';
import { countCartItems } from '../utils/functions';
import { toast } from 'react-toastify';
import { IBackendCheckoutResponse, IBackendResponseError } from '../interfaces/server.interface';
import { AxiosError } from 'axios';
import api from '../axios/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { GlobalContextType } from '../interfaces/globalContext.interface';

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [cartAmount, setCartAmount] = useState<number>(0);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const checkout = async (products: IProductCart[], redirectUrl?: string): Promise<void> => {
    if (products.length) {
      try {
        setIsLoading(true);
        const { data: { message: redirectUrl } } = await api.post<IBackendCheckoutResponse>('/stripe/create-checkout-session', { products });
        window.location.href = redirectUrl;
      } catch (error) {
        if ((error as AxiosError).response?.status === 401) {
          return navigate('/login', { state: { from: { pathname: redirectUrl } } });
        }
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
    <GlobalContext.Provider value={globalContent}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
