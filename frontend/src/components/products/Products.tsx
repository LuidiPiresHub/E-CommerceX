import { useEffect, useState } from 'react';
import IProduct from '../../interfaces/products.interface';
import styles from './Products.module.css';
import { FaCartArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Product() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {

        const response = await fetch('http://localhost:3001/products');
        const { message } = await response.json();
        if (!response.ok) throw new Error(message);
        setProducts(message);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchData();
  }, []);

  const formartPrice = (price: number): string => price.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' });

  return (
    <main>
      <section className={styles.card}>
        {!error ? (products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className={styles.cardWrapper}>
            <div className={styles.cardItem}>
              <img src={product.productImage} alt={product.productName} className={styles.cardImage} />
              <div className={styles.cardInfo}>
                {/* <h2 className={styles.cardTitle}>{product.productName}</h2> */}
                <h2 className={styles.cardTitle}>PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB</h2>
                <span className={styles.cardPrice}>{`${formartPrice(product.price)} à vista`}</span>
                <p className={styles.cardInstallments}>{`Em até 12x de ${formartPrice(product.price / 12)} sem juros`}</p>
              </div>
            </div>
            <button className={styles.cardBuy}>Adicionar ao carrinho <i>{<FaCartArrowDown />}</i> </button>
          </Link>
        ))) : (
          <h1>{error}</h1>
        )}
      </section>
    </main>
  );
}
