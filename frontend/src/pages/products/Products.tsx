import { useEffect } from 'react';
import styles from './Products.module.css';
import { FaCartArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formartPrice } from '../../utils/functions';
import EcommerceContext from '../../context/EcommerceContext';
import { useContext } from 'react';
import Header from '../../components/header/Header';
import IProduct from '../../interfaces/products.interface';

export default function Product() {
  const { setCartAmount, getAllProducts, products, error } = useContext(EcommerceContext);

  useEffect(() => {
    getAllProducts();
  }, []);

  const addToCart = (product: IProduct): void => {
    const cartItems = JSON.parse(localStorage.getItem('cart')!) || [];
    setCartAmount(cartItems.length);
    const existingProductIndex = cartItems.findIndex((item: IProduct) => item.id === product.id);
    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setCartAmount((JSON.parse(localStorage.getItem('cart')!) || []).length);
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.card}>
          {!error ? (products.map((product) => (
            <div key={product.id} className={styles.cardWrapper}>
              <Link to={`/product/${product.id}`} className={styles.cardItem}>
                <img src={product.productImage} alt={product.productName} className={styles.cardImage} />
                <div className={styles.cardInfo}>
                  <h2 className={styles.cardTitle}>{product.productName}</h2>
                  <span className={styles.cardPrice}>{`${formartPrice(product.price)} à vista`}</span>
                  <p className={styles.cardInstallments}>{`Em até 12x de ${formartPrice(product.price / 12)} sem juros`}</p>
                </div>
              </Link>
              <button type='button' onClick={() => addToCart(product)} className={styles.cardBuy}>Adicionar ao carrinho{<FaCartArrowDown />}</button>
            </div>
          ))) : (
            <h1>{error}</h1>
          )}
        </section>
      </main>
    </>
  );
}
