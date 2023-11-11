import { useState, FormEvent, useContext } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import styles from './Header.module.css';
import EcommerceContext from '../../context/EcommerceContext';

export default function Header() {
  const [search, setSearch] = useState('');
  const { fetchData } = useContext(EcommerceContext);
  
  const getProductByQuery = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(search);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>E-CommerceX</h1>
      <form className={styles.searchWrapper} onSubmit={getProductByQuery}>
        <input
          type="search"
          className={styles.searchBar}
          onChange={({ target: { value } }) => setSearch(value)}
        />
        <button type="submit" className={styles.searchButton}>
          <FaSearch />
        </button>
      </form>
      <div className={styles.cart}>
        <span className={styles.cartAmount}>0</span>
        <FaShoppingCart className={styles.cartIcon} />
      </div>
    </header>
  );
}
