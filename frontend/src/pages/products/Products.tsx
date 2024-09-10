import styles from './Products.module.css';
import { FaCartArrowDown } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import { formartPrice, getHightestQuality } from '../../utils/functions';
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { IProduct } from '../../interfaces/products.interface';
import axios, { AxiosError } from 'axios';
import handleAxiosError from '../../axios/handleAxiosError';
import { IMercadoLivreResponse } from '../../interfaces/mercadoLivre.interfaces';
import { MagnifyingGlass } from 'react-loader-spinner';
import Pagination from '../../components/pagination/Pagination';
import { useCart } from '../../context/CartContext';

export default function Product() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { throttledAddToCart } = useCart();

  const limit = 50;
  const maxOffset = 900;
  const productKeywords = ['Iphone', 'Notebook', 'Televisão', 'Monitor', 'Pc Gamer', 'Tablet'];
  const randomProduct = productKeywords[Math.floor(Math.random() * productKeywords.length)];
  const search = searchParams.get('search') || randomProduct;
  const page = Number(searchParams.get('page')) || 1;
  const offset = (page * limit) - limit;

  useEffect(() => {
    document.title = 'E-CommerceX - Produtos';
    const getAllProductsByName = async (query: string, offset: number, limit: number, maxOffset: number): Promise<void> => {
      try {
        setIsLoading(true);
        const API_URL = `${import.meta.env.VITE_ML_SEARCH_URL}?q=${query}&offset=${offset}&limit=${limit}`;
        const { data: { results, paging: { total } } } = await axios.get<IMercadoLivreResponse>(API_URL);

        const mappedProducts: IProduct[] = results.map((product: IProduct) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        }));

        if (!results.length) {
          setError('Nenhum produto encontrado');
        } else {
          setError(null);
          setProducts(mappedProducts);
          setPageCount(Math.ceil(Math.min(total / limit, maxOffset / limit)));
        }
      } catch (error) {
        handleAxiosError(error as AxiosError, setError);
      } finally {
        setIsLoading(false);
      }
    };
    getAllProductsByName(search, offset, limit, maxOffset);
  }, [searchParams]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        {isLoading ? (
          <MagnifyingGlass
            visible={true}
            height="130"
            width="130"
            ariaLabel="magnifying-glass-loading"
            glassColor="#ADD8E6"
            color="#1533db"
          />
        ) : error ? (
          <h1>
            {error}
          </h1>
        ) : (
          <>
            <section className={styles.cardContainer}>
              {products.map((product) => (
                <div key={product.id} className={styles.card}>
                  <Link to={`/product/${product.id}`} className={styles.cardItem}>
                    <img src={getHightestQuality(product.thumbnail)} alt={product.title} className={styles.cardImage} />
                    <div className={styles.cardInfo}>
                      <h2 className={styles.cardTitle}>
                        {product.title}
                      </h2>
                      <span className={styles.cardPrice}>
                        {`${formartPrice(product.price)} à vista`}
                      </span>
                      <p className={styles.cardInstallments}>
                        {`Em até 12x de ${formartPrice(product.price / 12)} sem juros`}
                      </p>
                    </div>
                  </Link>
                  <button type='button' onClick={() => throttledAddToCart(product)} className={styles.cardBuy}>
                    Adicionar ao carrinho
                    <FaCartArrowDown />
                  </button>
                </div>
              ))}
            </section>
            <Pagination
              forcePage={pageCount === 0 ? -1 : Math.floor(offset / limit)}
              pageCount={pageCount}
              onPageChange={({ selected }) => setSearchParams({ search: search, page: String(selected + 1) })}
            />
          </>
        )}
      </main>
    </>
  );
}
