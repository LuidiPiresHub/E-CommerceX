import { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { calcCartItemsPrice, countCartItems, formartPrice, getHightestQuality } from '../../utils/functions';
import EcommerceContext from '../../context/EcommerceContext';
import { useNavigate } from 'react-router-dom';
import IProduct from '../../interfaces/products.interface';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import emptyCart from '../../assets/images/empty-cart.png';

export default function Cart() {
  const [cart, setCart] = useState<IProduct[]>([]);
  const { setCartAmount } = useContext(EcommerceContext);

  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')!) || []);
  }, []);

  useEffect(() => {
    if (cart.length) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const decrementQuantity = (id: string): void => {
    setCartAmount((prevAmount) => prevAmount > 0 ? prevAmount - 1 : 0);
    setCart((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === id && product.quantity! > 0) {
          return { ...product, quantity: product.quantity! - 1 };
        }
        return product;
      });
      return updatedProducts.filter((product) => product.quantity! > 0);
    });
  };

  const incrementQuantity = (id: string): void => {
    setCartAmount((prevAmount) => prevAmount + 1);
    setCart((prevProducts) => prevProducts.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity! + 1 };
      }
      return product;
    }));
  };

  const clearCart = (): void => {
    setCartAmount(0);
    setCart([]);
  };

  const cartItemCount = countCartItems(cart);
  const displayText = cartItemCount === 1 ? `${cartItemCount} item total` : `${cartItemCount} itens totais`;

  const cartHeader = cart.length ? `${cart.length} ${cart.length === 1 ? 'Item' : 'Itens'}` : 'Carrinho vazio';

  return (
    <main className={styles.main}>
      <div className={styles.productsContainer}>
        <header className={styles.header}>
          <Link to='/' className={styles.leaveCart}>
            <FaLongArrowAltLeft />
            Continuar Comprando
          </Link>
          <div className={styles.headerInfo}>
            <h1 className={styles.headerTitle}>Shopping Cart</h1>
            <span className={styles.cartAmount}>{cartHeader}</span>
          </div>
        </header>
        <section className={styles.productsOverflow}>
          {cart.length ? (
            cart.map((product) => (
              <article key={product.id} className={styles.productCard}>
                <Link to={`/product/${product.id}`} className={styles.productLink}>
                  <img src={getHightestQuality(product.thumbnail)} alt={product.title} className={styles.productImage} />
                </Link>
                <div className={styles.detailsWrapper}>
                  <h2 className={styles.productName}>{product.title}</h2>
                  <div className={styles.wrapper}>
                    <p>{formartPrice(product.price)}</p>
                    <div className={styles.btnWrapper}>
                      <button type='button' className={styles.quantityBtn} onClick={() => decrementQuantity(product.id)}>-</button>
                      <span className={styles.productQuantity}>{product.quantity}</span>
                      <button type='button' className={styles.quantityBtn} onClick={() => incrementQuantity(product.id)}>+</button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <img src={emptyCart} alt="Carrinho vazio logo" className={styles.emptyCart} />
          )}
        </section>
      </div>
      <aside className={styles.checkout}>
        <h1 className={styles.cartTitle}>Finalizar Compra</h1>
        <div className={styles.checkoutInfo}>
          <span className={styles.checkoutAmount}>{displayText}</span>
          <span className={styles.checkoutPrice}>{formartPrice(calcCartItemsPrice(cart))}</span>
        </div>
        <button type='button' className={`${styles.checkoutBtn} ${styles.cleanCartBtn}`} onClick={clearCart} >Limpar Carrinho</button>
        <div className={styles.finish}>
          <span className={styles.totalPrice}>{`Total: ${formartPrice(calcCartItemsPrice(cart))}`}</span>
          <button type='button' className={`${styles.checkoutBtn} ${styles.btnCheckout}`} onClick={() => navigate('/checkout')}>Continuar a Compra</button>
        </div>
      </aside>
    </main>
  );
}
