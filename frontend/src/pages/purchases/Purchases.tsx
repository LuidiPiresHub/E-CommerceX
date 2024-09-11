import { useEffect, useState } from 'react';
import api from '../../axios/api';
import Header from '../../components/header/Header';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './Purchases.module.css';
import { formartPrice, getHightestQuality } from '../../utils/functions';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { IPurchasesBackend, Purchase } from '../../interfaces/purchases.interface';
import { ThreeCircles } from 'react-loader-spinner';
import Pagination from '../../components/pagination/Pagination';
import Swal from 'sweetalert2';
import Conffeti from '../../components/conffeti/Conffeti';
import { useCart } from '../../context/CartContext';

export default function Purchases() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [showConffeti, setShowConffeti] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { checkout, clearCart } = useCart();
  const page = Number(searchParams.get('page')) || 1;
  const fromPayment = searchParams.get('fromPayment');
  const navigate = useNavigate();

  useEffect(() => {
    searchParams.delete('fromPayment');
    navigate({ search: searchParams.toString() }, { replace: true });
    if (fromPayment === 'true') {
      setShowConffeti(true);
      Swal.fire({
        title: 'Compra Realizada!',
        text: 'Sua compra foi concluída com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => setShowConffeti(false));
      clearCart();
    }
  }, [location]);

  useEffect(() => {
    document.title = 'E-CommerceX - Compras';
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const { data: { message } } = await api.get<IPurchasesBackend>(`/products/purchases?page=${page}`);
        if (typeof message === 'string') throw new Error(message);
        setPurchases(message.purchases);
        setPageCount(message.pageCount);
      } catch (error) {
        setError((error as Error).message || 'Ocorreu um erro ao buscar suas compras');
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, [searchParams]);

  const handleCheckout = (purchase: Purchase) => {
    checkout([{
      cart_product_id: purchase.purchased_product_id,
      cart_product_price: purchase.purchased_product_price / 100,
      cart_product_title: purchase.purchased_product_name,
      cart_product_thumbnail: purchase.purchased_product_thumbnail,
      cart_product_quantity: 1,
    }]);
  };

  if (loading) return (
    <>
      <Header />
      <div className={styles.spinnerWrapper}>
        <ThreeCircles
          height="100"
          width="100"
          color="#0076CE"
          ariaLabel="three-circles-loading"
        />
      </div>
    </>
  );

  if (error) return (
    <>
      <Header />
      <h1 className={styles.errorMessage}>{error}</h1>
    </>
  );

  return (
    <>
      {showConffeti && <Conffeti />}
      <Header />
      <main className={styles.main}>{purchases.map((purchase) => (
        <div key={purchase.id} className={styles.purchaseContainer}>
          <span className={styles.purchaseDate}>{format(purchase.created_at, 'dd \'de\' MMMM \'de\' yyyy \'as\' HH:mm', { locale: ptBR })}</span>
          <div className={styles.wrapper}>
            <img src={getHightestQuality(purchase.purchased_product_thumbnail)} alt={purchase.purchased_product_name} className={styles.purchaseImg} />
            <div className={styles.detailsContainer}>
              <h2 className={styles.approved}>Aprovado</h2>
              <h1 className={styles.purchaseTitle}>{purchase.purchased_product_name}</h1>
              <div className={styles.detailsWrapper}>
                <span>{formartPrice(purchase.purchased_product_price / 100)}</span>
                <span>Quantidade: {purchase.purchased_product_quantity}</span>
              </div>
            </div>
            <nav className={styles.btnContainer}>
              <Link to={`/product/${purchase.purchased_product_id}`} className={styles.button}>Ver produto</Link>
              <button type='button' onClick={() => handleCheckout(purchase)} className={styles.button}>Comprar novamente</button>
            </nav>
          </div>
        </div>
      ))}</main>
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
