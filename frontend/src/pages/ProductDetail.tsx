import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState({});
  const [error, setError] = useState<null | string>(null);

  const fetchData = async (endpoint: string = '', method: string = 'GET', body: null | object = null) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(apiUrl + endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body && JSON.stringify({ body }),
      });
      const { message } = await response.json();
      if (!response.ok) throw new Error(message);
      setProduct(message);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    fetchData(`/products/${id}`);
  }, [id]);
  return (
    <section>
      <h1>Product Detail</h1>
      <p>{error}</p>
      <p>{!error && JSON.stringify(product)}</p>
    </section>
  );
}
