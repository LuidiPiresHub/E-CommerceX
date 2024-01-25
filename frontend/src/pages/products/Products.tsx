import styles from './Products.module.css';
import { FaCartArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formartPrice, getHightestQuality } from '../../utils/functions';
import EcommerceContext from '../../context/EcommerceContext';
import { useContext, useEffect } from 'react';
import Header from '../../components/header/Header';
import ReactPaginate from 'react-paginate';

export default function Product() {
  const { addToCart, products, isLoading, error, getAllProductsByName, offset, setOffset, limit, pageCount } = useContext(EcommerceContext);

  useEffect(() => {
    getAllProductsByName();
  }, [offset]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        {isLoading ? (
          <h1>Carregando...</h1>
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
                  <button type='button' onClick={() => addToCart(product)} className={styles.cardBuy}>
                    Adicionar ao carrinho
                    {<FaCartArrowDown />}
                  </button>
                </div>
              ))}
            </section>
            <ReactPaginate
              breakLabel=""
              nextLabel="Next"
              onPageChange={({ selected }) => setOffset((selected + 1) * limit - limit)}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              previousLabel="Previous"
              renderOnZeroPageCount={null}
              containerClassName={styles.pagination}
              pageLinkClassName={styles.pageLink}
              previousLinkClassName={styles.previous}
              nextLinkClassName={styles.next}
              activeLinkClassName={styles.active}
              breakLinkClassName={styles.break}
              disabledLinkClassName={styles.disabledLink}
              forcePage={pageCount === 0 ? -1 : Math.floor(offset / limit)}
            />
          </>
        )}
      </main>
    </>
  );
}
