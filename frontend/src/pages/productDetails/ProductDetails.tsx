import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import handleAxiosError from '../../axios/handleAxiosError';
import axios, { AxiosError } from 'axios';
import IProduct from '../../interfaces/products.interface';
import EcommerceContext from '../../context/EcommerceContext';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const { error, setError, isLoading, setIsLoading } = useContext(EcommerceContext);

  
  useEffect(() => {
    const getProductById = async (id: string): Promise<void> => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_ML_ITEM_URL}/${id}`);
        setProduct(data);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        setProduct(null);
        handleAxiosError(error as AxiosError, setError);
      }
    };

    getProductById(id as string);
  }, [id]);

  return (
    <main>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>{JSON.stringify(product)}</p>
      )}
    </main>
  );
}
