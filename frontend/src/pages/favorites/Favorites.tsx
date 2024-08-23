import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';
import { formartPrice } from '../../utils/functions';
import { useEffect, useState } from 'react';
import { IFavoriteBackend, IProductFavorite } from '../../interfaces/favorite.interface';
import api from '../../axios/api';
import { FaHeart } from 'react-icons/fa';
import styles from './Favorites.module.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState<IProductFavorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'E-CommerceX - Favoritos';
    const getFavorites = async () => {
      try {
        const { data: { message } } = await api.get<IFavoriteBackend>('products/favorites');
        setFavorites(message);
      } catch (error) {
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    };
    getFavorites();
  }, []);

  const unfavoriteProduct = async (productId: string) => {
    const newFavorites = favorites.filter((favorite) => favorite.favorited_product_id !== productId);
    setFavorites(newFavorites);
    await api.delete(`/products/favorite/${productId}`);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        {isLoading ? (
          <h1>Carregando...</h1>
        ) : (
          !isLoading && !favorites.length ? (
            <h1>Nenhum Produto favoritado!</h1>
          ) : (
            favorites.map((favorite) => (
              <section
                className={styles.container}
                key={favorite.id}
              >
                <Link
                  to={`/product/${favorite.favorited_product_id}`}
                  className={styles.product}
                >
                  <img
                    src={favorite.favorited_product_thumbnail}
                    alt={favorite.favorited_product_name}
                    className={styles.image}
                  />
                  <div className={styles.details}>
                    <p>{favorite.favorited_product_name}</p>
                    <div className={styles.priceWrapper}>
                      <span>{formartPrice(favorite.favorited_product_price)}</span>
                      {`Em até 12x de ${formartPrice(favorite.favorited_product_price / 12)} sem juros`}
                    </div>
                  </div>
                </Link>
                <FaHeart
                  className={styles.icon}
                  onClick={() => unfavoriteProduct(favorite.favorited_product_id)}
                />
              </section>
            ))
          )
        )}
      </main>
    </>
  );
}
