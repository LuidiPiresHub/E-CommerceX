import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../axios/api';
import handleAxiosError from '../../axios/handleAxiosError';
import { AxiosError } from 'axios';
import IProduct from '../../interfaces/products.interface';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [error, setError] = useState<null | string>(null);

  const getProductById = async (id: number): Promise<void> => {
    try {
      const { data: { message } } = await api.get(`/products/${id}`);
      setProduct(message);
      setError(null);
    } catch (error) {
      setProduct(null);
      handleAxiosError(error as AxiosError, setError);
    }
  };

  useEffect(() => {
    getProductById(Number(id));
  }, [id]);

  return (
    <section>
      <h1>Product Detail</h1>
      <p>{error}</p>
      <p>{!error && JSON.stringify(product)}</p>
    </section>
  );
}
