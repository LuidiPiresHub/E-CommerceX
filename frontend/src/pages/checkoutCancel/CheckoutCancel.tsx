import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import styles from './CheckoutCancel.module.css';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export default function CheckoutCancel() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>Compra cancelada!</h1>
        <Link to='/' className={styles.leaveCart}>
          <FaLongArrowAltLeft />
          Voltar para a loja
        </Link>
      </main>
    </>
  );
}
