import { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { formartPrice } from '../../utils/functions';
import EcommerceContext from '../../context/EcommerceContext';

export default function Cart() {
  interface IProduct {
    id: number;
    productName: string;
    price: number;
    productImage: string;
    quantity: number;
  }
  const [cart, setCart] = useState<IProduct[]>([]);
  const { setCartAmount } = useContext(EcommerceContext);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')!) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const decrementQuantity = (id: number): void => {
    setCartAmount((prevAmount) => prevAmount > 0 ? prevAmount - 1 : 0);
    setCart((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === id && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      return updatedProducts.filter((product) => product.quantity > 0);
    });
  };

  const incrementQuantity = (id: number): void => {
    setCartAmount((prevAmount) => prevAmount + 1);
    setCart((prevProducts) => prevProducts.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    }));
  };

  return (
    <main className={styles.main}>
      {cart.map((product) => (
        <article key={product.id} className={styles.productCard}>
          <img src={product.productImage} alt={product.productName} className={styles.productImage} />
          <div className={styles.detailsWrapper}>
            <h2 className={styles.productName}>{product.productName}</h2>
            <div className={styles.wrapper}>
              <p>{formartPrice(product.price)}</p>
              <div className={styles.btnWrapper}>
                <button type='button' className={`${styles.btn} ${styles.decrease}`} onClick={() => decrementQuantity(product.id)}>-</button>
                <span className={styles.productQuantity}>{product.quantity}</span>
                <button type='button' className={`${styles.btn} ${styles.increase}`} onClick={() => incrementQuantity(product.id)}>+</button>
              </div>
            </div>
          </div>
        </article>
      ))}
      <div className={styles.totalWrapper}>
        <span className={styles.totalPrice}>{`Total: ${formartPrice(cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0))}`}</span>
        <button type='button' className={styles.btnCheckout}>Finalizar Compra</button>
      </div>
    </main>
  );
}
