import { useCallback, useEffect } from 'react';
import styles from './Cart.module.css';
import { calcCartItemsPrice, countCartItems, formartPrice, getHightestQuality } from '../../utils/functions';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import emptyCart from '../../assets/images/empty-cart.png';
import Swal from 'sweetalert2';
import LoadingBtn from '../../components/loadingBtn/LoadingBtn';
import { useCart } from '../../context/CartContext';
import api from '../../axios/api';
import { debounce } from 'lodash';
import { ICart } from '../../interfaces/cart.interface';

export default function Cart() {
  const { cart, setCart, setCartAmount, checkout, isLoading } = useCart();

  useEffect(() => {
    document.title = 'E-CommerceX - Carrinho';
  }, []);

  const debouncedUpdateCart = useCallback(
    debounce(async (id: string, quantity: number, revert: ICart[]) => {
      try {
        if (quantity === 0) {
          await api.delete(`/cart/${id}`);
        } else {
          await api.put(`/cart/${id}`, { quantity });
        }
      } catch {
        setCart(revert);
      }
    }, 300),
    []
  );

  const decrementQuantity = async (id: string): Promise<void> => {
    const previousCartState = [...cart];
    setCartAmount((prevAmount) => prevAmount > 0 ? prevAmount - 1 : 0);
    setCart((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.cart_product_id === id && product.cart_product_quantity > 0) {
          return { ...product, cart_product_quantity: product.cart_product_quantity - 1 };
        }
        return product;
      });
      return updatedProducts.filter((product) => product.cart_product_quantity > 0);
    });

    const product = cart.find((item) => item.cart_product_id === id);
    if (!product) return;
    
    debouncedUpdateCart(id, product.cart_product_quantity - 1, previousCartState);
  };

  const incrementQuantity = async (id: string): Promise<void> => {
    const previousCartState = [...cart];
    setCartAmount((prevAmount) => prevAmount + 1);
    setCart((prevProducts) => prevProducts.map((product) => {
      if (product.cart_product_id === id) {
        return { ...product, cart_product_quantity: product.cart_product_quantity + 1 };
      }
      return product;
    }));

    const product = cart.find((item) => item.cart_product_id === id);
    if (!product) return;
  
    debouncedUpdateCart(id, product.cart_product_quantity + 1, previousCartState);
  };

  const clearCart = async (): Promise<void> => {
    if (cart.length) {
      Swal.fire({
        title: 'Tem certeza?',
        text: 'Você não poderá recuperar o carrinho depois de limpar.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, limpe!',
        cancelButtonText: 'Não, cancele!',
        reverseButtons: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then(async ({ isConfirmed, dismiss }) => {
        if (isConfirmed) {
          try {
            Swal.fire('Limpo!', 'Seu carrinho foi limpo.', 'success');
            setCart([]);
            setCartAmount(0);
            await api.delete('/cart');
          } catch {
            Swal.fire('Erro!', 'Ocorreu um erro ao limpar o carrinho.', 'error');
          }
        } else if (dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelado', 'Seu carrinho está seguro :)', 'error');
        }
      });
    }
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
              <article key={product.cart_product_id} className={styles.productCard}>
                <Link to={`/product/${product.id}`} className={styles.productLink}>
                  <img src={getHightestQuality(product.cart_product_thumbnail)} alt={product.cart_product_title} className={styles.productImage} />
                </Link>
                <div className={styles.detailsWrapper}>
                  <h2 className={styles.productName}>{product.cart_product_title}</h2>
                  <div className={styles.wrapper}>
                    <p>{formartPrice(product.cart_product_price)}</p>
                    <div className={styles.btnWrapper}>
                      <button type='button' className={styles.quantityBtn} onClick={() => decrementQuantity(product.cart_product_id)}>-</button>
                      <span className={styles.productQuantity}>{product.cart_product_quantity}</span>
                      <button type='button' className={styles.quantityBtn} onClick={() => incrementQuantity(product.cart_product_id)}>+</button>
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
        <button type='button' className={`${styles.checkoutBtn} ${styles.cleanCartBtn}`} disabled={!cart.length} onClick={clearCart}>Limpar Carrinho</button>
        <div className={styles.finish}>
          <span className={styles.totalPrice}>{`Total: ${formartPrice(calcCartItemsPrice(cart))}`}</span>
          <LoadingBtn
            className={`${styles.checkoutBtn} ${styles.btnCheckout} ${!cart.length ? styles.disabled : ''}`.trim()}
            onClick={() => checkout(cart)}
            isLoading={isLoading}
            disabled={!cart.length}
          >
            Continuar a Compra
          </LoadingBtn>
        </div>
      </aside>
    </main>
  );
}
