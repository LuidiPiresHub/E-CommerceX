import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import styles from './CheckoutSuccess.module.css';
import { FaLongArrowAltLeft, FaShoppingBag } from 'react-icons/fa';

export default function CheckoutSuccess() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>Compra efetuada com sucesso</h1>
        <div className={styles.wrapper}>
          <Link to='/' className={styles.links}>
            <FaLongArrowAltLeft />
            Voltar para a loja
          </Link>
          <Link to='/purchase-history' className={styles.links}>
            Minhas compras
            <FaShoppingBag />
          </Link>
        </div>
      </main >
    </>
  );
}
