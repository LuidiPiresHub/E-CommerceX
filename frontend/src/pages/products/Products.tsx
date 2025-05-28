import styles from './Products.module.css';
import { FaCartArrowDown } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import { formartPrice, getHightestQuality } from '../../utils/functions';
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { IProduct } from '../../interfaces/products.interface';
// import axios, { AxiosError } from 'axios';
// import handleAxiosError from '../../axios/handleAxiosError';
// import { IMercadoLivreResponse } from '../../interfaces/mercadoLivre.interfaces';
import { MagnifyingGlass } from 'react-loader-spinner';
import Pagination from '../../components/pagination/Pagination';
import { useCart } from '../../context/CartContext';
// import { shuffle } from 'lodash';

export default function Product() {
  const [products] = useState<IProduct[]>([]);
  const [pageCount] = useState(0);
  const [isLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { throttledAddToCart } = useCart();

  const search = searchParams.get('search');
  const page = Number(searchParams.get('page')) || 1;
  // const maxOffset = 900;

  // const mapProducts = (products: IProduct[]): IProduct[] => {
  //   return products.map((product) => ({
  //     id: product.id,
  //     title: product.title,
  //     price: product.price,
  //     thumbnail: product.thumbnail,
  //   }));
  // };

  // const fetchInitialProducts = async (limit: number) => {
  //   try {
  //     setIsLoading(true);
  //     const productsToSearch = ['Iphone', 'Notebook', 'Televisão', 'Monitor', 'Pc Gamer', 'Tablet'];
  //     const offset = (page * limit) - limit;
  //     const totalOffset = Math.min(offset, maxOffset);

  //     const promises = await Promise.all(productsToSearch.map((product) => {
  //       return axios.get<IMercadoLivreResponse>(`${import.meta.env.VITE_ML_SEARCH_URL}?q=${product}&offset=${totalOffset}&limit=${limit}`);
  //     }));

  //     const allProducts = promises.flatMap(({ data }) => data.results);
  //     const minPageTotal = Math.min(...promises.map(({ data }) => data.paging.total));
  //     const totalProductsPerPage = minPageTotal / limit;
  //     const maxPages = maxOffset / limit;
  //     const totalPages = Math.ceil(Math.min(totalProductsPerPage, maxPages)) + 1;

  //     setPageCount(totalPages);
  //     setProducts(shuffle(mapProducts(allProducts)));
  //   } catch (error) {
  //     handleAxiosError(error as AxiosError, setError);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const getAllProductsByName = async (product: string, limit: number): Promise<void> => {
  //   try {
  //     setIsLoading(true);
  //     const offset = (page * limit) - limit;
  //     const totalOffset = Math.min(offset, maxOffset);

  //     const API_URL = `${import.meta.env.VITE_ML_SEARCH_URL}?q=${product}&offset=${totalOffset}&limit=${limit}`;
  //     const { data: { results, paging: { total } } } = await axios.get<IMercadoLivreResponse>(API_URL);

  //     if (!results.length) {
  //       setError('Nenhum produto encontrado');
  //     } else {
  //       const totalProductsPerPage = total / limit;
  //       const maxPages = maxOffset / limit;
  //       const totalPages = Math.ceil(Math.min(totalProductsPerPage, maxPages)) + 1;
  //       setError(null);
  //       setProducts(mapProducts(results));
  //       setPageCount(totalPages);
  //     }
  //   } catch (error) {
  //     handleAxiosError(error as AxiosError, setError);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    document.title = 'E-CommerceX - Produtos';

    // const limit = search ? 50 : 10;
    // const maxPages = Math.ceil(maxOffset / limit) + 1;

    // if (page > maxPages) {
    //   setSearchParams((prevState) => ({ ...Object.fromEntries(prevState), page: String(maxPages) }));
    // } else {
    //   search ? getAllProductsByName(search, limit) : fetchInitialProducts(limit);
    // }

    setError('🚧 Site em Manutenção 🚧');
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
              forcePage={pageCount === 0 ? -1 : page - 1}
              pageCount={pageCount}
              onPageChange={({ selected }) => {
                search ? setSearchParams({ search: search, page: String(selected + 1) })
                  : setSearchParams({ page: String(selected + 1) });
              }}
            />
          </>
        )}
      </main>
    </>
  );
}
