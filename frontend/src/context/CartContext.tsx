import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ICart, ICartBackend } from '../interfaces/cart.interface';
import { IProduct } from '../interfaces/products.interface';
import api from '../axios/api';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContextType } from '../interfaces/cartContext.interface';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import { IBackendCheckoutResponse, IBackendResponseError } from '../interfaces/server.interface';
import { countCartItems } from '../utils/functions';
import { throttle } from 'lodash';

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ICart[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cartAmount, setCartAmount] = useState<number>(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setCart([]);
      setCartAmount(0);
    }

    const fetchCartItems = async () => {
      try {
        const { data: { message } } = await api.get<ICartBackend>('/cart');
        setCart(message);
        setCartAmount(countCartItems(message));
      } catch {
        setCart([]);
      }
    };
    fetchCartItems();
  }, [isAuthenticated]);

  const cartRef = useRef(cart);
  cartRef.current = cart;

  const updateCartState = (product: ICart, productExist: ICart | undefined): void => {
    setCart((prevState) => {
      if (productExist) {
        return prevState.map((item) => {
          if (item.cart_product_id === product.cart_product_id) {
            return { ...item, cart_product_quantity: item.cart_product_quantity + 1 };
          }
          return item;
        });
      }
      return [product, ...prevState];
    });
  };

  const addToCart = async (product: IProduct): Promise<void> => {
    if (!isAuthenticated) return navigate('/login', { state: { from: { pathname: `/product/${product.id}` } } });
    const productExist = cartRef.current.find((item) => item.cart_product_id === product.id);
    const previousCartState = [...cart];
    const previousCartCounter = cartAmount;

    setCartAmount(countCartItems(cartRef.current) + 1);

    updateCartState({
      cart_product_id: product.id,
      cart_product_title: product.title,
      cart_product_price: product.price,
      cart_product_quantity: 1,
      cart_product_thumbnail: product.thumbnail,
    }, productExist);

    try {
      if (productExist) {
        await api.put(`/cart/${product.id}`, { quantity: productExist.cart_product_quantity + 1 });
      } else {
        await api.post('/cart', { cart: { ...product, quantity: 1 } });
      }
      toast.success('Item adicionado ao carrinho!', {
        position: 'top-left',
        autoClose: 2000,
      });
    } catch {
      setCart(previousCartState);
      setCartAmount(previousCartCounter);
      toast.error('Erro ao adicionar produto ao carrinho!', {
        position: 'top-left',
        autoClose: 2000,
      });
    }
  };

  const throttledAddToCart = useCallback(
    throttle(async (product: IProduct) => {
      await addToCart(product);
    }, 200),
    [isAuthenticated]
  );

  const checkout = async (products: ICart[], redirectUrl?: string): Promise<void> => {
    if (products.length) {
      try {
        const { isConfirmed } = await Swal.fire({
          title: 'Compra Fictícia',
          html: 'Use o cartão <span class="cardHighlight">4242 4242 4242 4242</span> para simular uma compra bem-sucedida.',
          icon: 'info',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Copiar e Continuar',
          confirmButtonColor: 'rgb(48, 133, 214)',
          reverseButtons: true,
        });

        if (isConfirmed) {
          setIsLoading(true);
          const { data: { message: checkoutUrl } } = await api.post<IBackendCheckoutResponse>('/stripe/create-checkout-session', { products });
          await navigator.clipboard.writeText('4242 4242 4242 4242');
          await Swal.fire({
            title: 'Cartão Copiado!',
            text: 'Redirecionando para a página de compras...',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
          window.location.href = checkoutUrl;
        }

      } catch (error) {
        if ((error as AxiosError).response?.status === 401) {
          return navigate('/login', { state: { from: { pathname: redirectUrl } } });
        }

        const errorMessage = (error as AxiosError).message === 'Network Error'
          ? 'Erro de conexão com o servidor'
          : (error as IBackendResponseError)?.response?.data?.message || 'Ocorreu um erro interno';

        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
          footer: 'Por favor, tente novamente mais tarde.',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const clearCart = async (): Promise<void> => {
    await api.delete('/cart');
    setCart([]);
    setCartAmount(0);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, checkout, setCartAmount, cartAmount, isLoading, throttledAddToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
