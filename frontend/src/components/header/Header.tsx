import { useState, FormEvent, useContext } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import styles from './Header.module.css';
import EcommerceContext from '../../context/EcommerceContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const [search, setSearch] = useState('');
  const { cartAmount, getAllProductsByName } = useContext(EcommerceContext);

  const getProductByQuery = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getAllProductsByName(search);
  };

  const hasLogin = true;

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>E-CommerceX</h1>
      <form className={styles.searchWrapper} onSubmit={getProductByQuery}>
        <input
          type="search"
          className={styles.searchBar}
          placeholder='Buscar produtos'
          onChange={({ target: { value } }) => setSearch(value)}
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
          <span className={styles.cartAmount}>
            {cartAmount}
          </span>
          <FaShoppingCart className={styles.cartIcon} />
        </Link>
      </section>
    </header>
  );
}
