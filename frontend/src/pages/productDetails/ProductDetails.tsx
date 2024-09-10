import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { IProductDetail } from '../../interfaces/products.interface';
import styles from './ProductDetails.module.css';
import { formartPrice } from '../../utils/functions';
import Header from '../../components/header/Header';
import { FaStar, FaRegHeart, FaHeart } from 'react-icons/fa';
import ImageZoom from '../../components/ImageZoom/ImageZoom';
import api from '../../axios/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { ThreeCircles } from 'react-loader-spinner';
import { useCart } from '../../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProductDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, checkout } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const getProductById = async (productId: string): Promise<void> => {
    try {
      setIsLoading(true);
      const { data: { id, title, price, thumbnail, pictures } } = await axios.get<IProductDetail>(`${import.meta.env.VITE_ML_ITEM_URL}/${productId}`);
      setProduct({ id, title, price, thumbnail, pictures });
      setSelectedImage(pictures[0].url);
      document.title = `E-CommerceX - ${title}`;
      setError(null);
    } catch {
      setProduct(null);
      setError('Não foi possível carregar o produto :(');
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfFavorite = async (productId: string) => {
    try {
      const { data: { message } } = await api.get(`products/favorite/${productId}`);
      setIsFavorite(message);
    } catch {
      setError('Não foi possível verificar o estado do favorito.');
    }
  };

  const handleCartAdd = () => {
    const { id, title, price, thumbnail } = product!;
    addToCart({ id, title, price, thumbnail });
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        setIsFavorite(false);
        await api.delete(`/products/favorite/${product!.id}`);
      } else {
        setIsFavorite(true);
        await api.post('/products/favorite', {
          product: {
            id: product!.id,
            title: product!.title,
            price: product!.price,
            thumbnail: product!.thumbnail,
          }
        });
      }
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        navigate('/login', { state: { from: { pathname: `/product/${id}` } } });
      } else {
        toast.error('Falha ao atualizar favoritos.', {
          position: 'top-left',
          autoClose: 2000,
        });
      }
    }
  };

  const handleCheckout = async (): Promise<void> => {
    if (product) {
      checkout([{
        cart_product_id: product.id,
        cart_product_title: product.title,
        cart_product_price: product.price,
        cart_product_quantity: 1,
        cart_product_thumbnail: product.thumbnail,
      }], `/product/${id}`);
    }
  };

  useEffect(() => {
    getProductById(id as string);
  }, [id]);

  useEffect(() => {
    if (isAuthenticated && product) {
      checkIfFavorite(product.id);
    }
  }, [isAuthenticated, product]);

  if (isLoading) return (
    <div className={styles.spinnerWrapper}>
      <ThreeCircles
        height="100"
        width="100"
        color="#0076CE"
        ariaLabel="three-circles-loading"
      />
    </div>
  );

  if (error) return (
    <>
      <Header />
      <p className={styles.message}>{error}</p>
    </>
  );

  return (
    <>
      <Header />
      {product && (
        <main className={styles.main}>
          <div className={styles.containerWrapper}>
            <section className={styles.productContainer}>
              <aside className={styles.thumbnails}>{product.pictures.map(({ id, url }) => (
                <img
                  key={id}
                  src={url}
                  alt="Imagem alternativa do produto"
                  className={`${styles.altImages} ${selectedImage === url && styles.selectedImage}`}
                  onMouseOver={() => setSelectedImage(url)}
                  onClick={() => setSelectedImage(url)}
                />
              ))}</aside>
              <ImageZoom
                src={selectedImage}
                alt="Imagem principal do produto"
                imageContainerClassName={styles.imageContainer}
                imageClassName={styles.mainImage}
                magnifyClassName={styles.magnifier}
                zoom={5}
              />
            </section>
            <aside className={styles.productDetails}>
              <section className={styles.cardTop}>
                <p>Novo | +100 vendidos</p>
                {isFavorite ? (
                  <FaHeart className={styles.heart} onClick={toggleFavorite} />
                ) : (
                  <FaRegHeart className={styles.heart} onClick={toggleFavorite} />
                )}
              </section>
              <h1>{product.title}</h1>
              <section className={styles.ratingContainer}>
                <span>5.0</span>
                <div>
                  <FaStar className={styles.star} />
                  <FaStar className={styles.star} />
                  <FaStar className={styles.star} />
                  <FaStar className={styles.star} />
                  <FaStar className={styles.star} />
                </div>
                <span>(99+)</span>
              </section>
              <section className={styles.priceWrapper}>
                <h2>{formartPrice(product.price)}</h2>
                <h3>{`Em até 12x ${formartPrice(product.price / 12)}`}</h3>
              </section>
              <h4>O que você precisa saber sobre este produto:</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, similique quisquam aperiam pariatur ratione necessitatibus eaque dolorem vero deleniti officiis, blanditiis eos! Rem dignissimos placeat autem aliquid numquam harum tempora.</p>
              <footer className={styles.buttonsContainer}>
                <button onClick={handleCheckout} className={`${styles.btn} ${styles.buyBtn}`}>Comprar agora</button>
                <button type='button' onClick={handleCartAdd} className={`${styles.btn} ${styles.addCartBtn}`}>Adicionar ao carrinho</button>
              </footer>
            </aside>
          </div>
        </main>
      )}
    </>
  );
}
