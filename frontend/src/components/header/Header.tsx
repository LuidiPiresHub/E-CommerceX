import { FormEvent, useContext, useEffect, useState } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import styles from './Header.module.css';
import EcommerceContext from '../../context/EcommerceContext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../axios/api';

export default function Header() {
  const { cartAmount } = useContext(EcommerceContext);
  const [, setSearchParams] = useSearchParams();
  const [user, setUser] = useState({ name: '', img: '' });
  const navigate = useNavigate();

  const getProductByQuery = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const inputElement = formElement.elements[0] as HTMLInputElement;
    const inputValue = inputElement.value.trim();
    setSearchParams({ search: inputValue, offset: '0' });
    navigate(`/?search=${inputValue}&offset=0`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { message } } = await api.get('/user');
      console.log(message);
      setUser((prevState) => ({ ...prevState, name: message.name }));
    };
    fetchUser();
  }, []);

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
        <Link to={user.name ? '/options' : '/login'} className={styles.userContainer}>
          {user.img ? <img src={user.img} className={styles.userPhoto} /> : <FaUserCircle className={styles.userIcon} />}
          <span className={styles.user}>
            {user.name ? `Olá, ${user.name}` : 'Fazer Login'}
          </span>
        </Link>
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
