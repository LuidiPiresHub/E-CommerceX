import { ReactNode, useEffect, useState } from 'react';
import EcommerceContext from './EcommerceContext';
import IProduct from '../interfaces/products.interface';
import axios, { AxiosError } from 'axios';
import handleAxiosError from '../axios/handleAxiosError';
import { useLocation, useNavigate } from 'react-router-dom';
import { countCartItems } from '../utils/functions';

export default function EcommerceProvider({ children }: { children: ReactNode }) {
  const maxOffset = 900;
  const limit = 50;
  const location = useLocation();
  const navigate = useNavigate();
  const [cartAmount, setCartAmount] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getQueryParam = (param: string, defaultValue: number) => {
    const value = new URLSearchParams(location.search).get(param);
    return value ? parseInt(value, 10) : defaultValue;
  };

  const [offset, setOffset] = useState<number>(Math.min(getQueryParam('offset', 0), maxOffset));

  const getAllProductsByName = async (productName: string = 'Iphone'): Promise<void> => {
    try {
      setIsLoading(true);
      const { data: { results, paging: { total } } } = await axios.get(`${import.meta.env.VITE_ML_SEARCH_URL}?q=${productName}&offset=${offset}&limit=${limit}`);
      setProducts(results);
      setPageCount(Math.ceil(Math.min(total / limit, maxOffset / limit)));
    } catch (error) {
      handleAxiosError(error as AxiosError, setError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cartItens = JSON.parse(localStorage.getItem('cart')!) || [];
    setCartAmount(countCartItems(cartItens));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('offset', String(offset));
    navigate({ pathname: location.pathname, search: `?${params.toString()}` });
  }, [offset]);

  const globalContent = {
    cartAmount,
    setCartAmount,
    products,
    getAllProductsByName,
    pageCount,
    setPageCount,
    error,
    setError,
    isLoading,
    setIsLoading,
    offset,
    setOffset,
    limit,
  };

  return (
    <EcommerceContext.Provider value={globalContent}>
      {children}
    </EcommerceContext.Provider>
  );
}
