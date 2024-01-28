import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import IProduct from '../../interfaces/products.interface';
import EcommerceContext from '../../context/EcommerceContext';
import styles from './ProductDetails.module.css';
import { formartPrice } from '../../utils/functions';
import Header from '../../components/header/Header';
import { FaStar, FaRegHeart } from "react-icons/fa";
import ImageZoom from '../../components/ImageZoom/ImageZoom';

export default function ProductDetails() {
  const { error, setError, isLoading, setIsLoading, addToCart } = useContext(EcommerceContext);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const getProductById = async (id: string): Promise<void> => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<IProduct>(`${import.meta.env.VITE_ML_ITEM_URL}/${id}`);
        setProduct(data);
        setSelectedImage(data.pictures[0]?.url || '');
        setError(null);
      } catch (error) {
        setProduct(null);
        setError('Não foi possível carregar o produto :(');
      } finally {
        setIsLoading(false);
      }
    };
    getProductById(id as string);
  }, []);


  if (isLoading) return <p className={styles.message}>Loading...</p>;

  if (error) return <p className={styles.message}>{error}</p>;

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
                <FaRegHeart className={styles.heart} />
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
                <Link to='/checkout' className={`${styles.btn} ${styles.buyBtn}`}>Comprar agora</Link>
                <button type='button' onClick={() => addToCart(product)} className={`${styles.btn} ${styles.addCartBtn}`}>Adicionar ao carrinho</button>
              </footer>
            </aside>
          </div>
        </main>
      )}
    </>
  );
}
