import { FormEvent, useContext } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import styles from './Header.module.css';
import EcommerceContext from '../../context/EcommerceContext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function Header() {
  const { cartAmount } = useContext(EcommerceContext);
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getProductByQuery = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const inputElement = formElement.elements[0] as HTMLInputElement;
    const inputValue = inputElement.value.trim();
    setSearchParams({ search: inputValue, offset: '0' });
  };

  const hasLogin = true;

  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={() => navigate('/')}>E-CommerceX</h1>
      <form className={styles.searchWrapper} onSubmit={getProductByQuery}>
        <input
          type="search"
          className={styles.searchBar}
          placeholder='Buscar produtos'
        />
        <button type="submit" className={styles.searchButton}>
          <FaSearch />
        </button>
      </form>
      <section className={styles.sectionWrapper}>
        <div className={styles.userContainer}>
          {hasLogin ? <img src='https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' className={styles.userPhoto} /> : <FaUser className={styles.userIcon} />}
          <span className={styles.user}>
            {hasLogin ? 'Olá Usuario123' : 'Fazer Login'}
          </span>
        </div>
        <Link to='/cart' className={styles.cart}>
          {cartAmount > 0 && (
            <span className={styles.cartAmount}>{cartAmount}</span>
          )}
          <FaShoppingCart className={styles.cartIcon} />
        </Link>
      </section>
    </header>
  );
}
