import Header from '../../components/header/Header';
import { Link, useSearchParams } from 'react-router-dom';
import { formartPrice } from '../../utils/functions';
import { useEffect, useState } from 'react';
import { IFavoriteBackend, IProductFavorite } from '../../interfaces/favorite.interface';
import api from '../../axios/api';
import { FaHeart } from 'react-icons/fa';
import styles from './Favorites.module.css';
import Pagination from '../../components/pagination/Pagination';

export default function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<IProductFavorite[]>([]);
  const [pageCount, setPageCount] = useState<number>(1)
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    document.title = 'E-CommerceX - Favoritos';
    const getFavorites = async () => {
      try {
        const { data: { message } } = await api.get<IFavoriteBackend>(`products/favorites?page=${page}`);
        if (typeof message === 'string') throw new Error(message);
        setFavorites(message.products);
        setPageCount(message.pageCount);
      } catch {
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    };
    getFavorites();
  }, [searchParams]);

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
            <h1 className={styles.errorMessage}>Nenhum Produto favoritado!</h1>
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
      {pageCount > 1 && (
        <footer className={styles.footer}>
          <Pagination
            pageCount={pageCount}
            forcePage={page - 1}
            onPageChange={({ selected }) => setSearchParams({ page: String(selected + 1) })}
          />
        </footer>
      )}
    </>
  );
}
