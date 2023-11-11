import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState({});
  const [error, setError] = useState<null | string>(null);

  const getProductById = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/products/${id}`);
      const { message } = await response.json();
      if (!response.ok) throw new Error(message);
      setProduct(message);
    } catch (error) {
      setError((error as Error).message);
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
