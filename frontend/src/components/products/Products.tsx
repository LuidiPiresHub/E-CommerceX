import { useEffect, useContext } from 'react';
import styles from './Products.module.css';
import { FaCartArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import EcommerceContext from '../../context/EcommerceContext';

export default function Product() {
  const { products, error, fetchData } = useContext(EcommerceContext);

  console.log('products', products);
  console.log(error);
  

  useEffect(() => {
    fetchData();
  }, []);

  const formartPrice = (price: number): string => price.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' });

  return (
    <main>
      <section className={styles.card}>
        {!error ? (products.map((product) => (
          <div key={product.id} className={styles.cardWrapper}>
            <Link to={`/product/${product.id}`} className={styles.cardItem}>
              <img src={product.productImage} alt={product.productName} className={styles.cardImage} />
              <div className={styles.cardInfo}>
                {/* <h2 className={styles.cardTitle}>{product.productName}</h2> */}
                <h2 className={styles.cardTitle}>PC Gamer T-GAMER Poseidon AMD Ryzen 7 5800X / NVIDIA GeForce RTX 4060 Ti / 32GB DDR4 / SSD NVMe 1TB</h2>
                <span className={styles.cardPrice}>{`${formartPrice(product.price)} à vista`}</span>
                <p className={styles.cardInstallments}>{`Em até 12x de ${formartPrice(product.price / 12)} sem juros`}</p>
              </div>
            </Link>
            <button className={styles.cardBuy}>Adicionar ao carrinho <i>{<FaCartArrowDown />}</i> </button>
          </div>
        ))) : (
          <h1>{error}</h1>
        )}
      </section>
    </main>
  );
}
