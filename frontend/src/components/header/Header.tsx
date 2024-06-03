import { FaHeart, FaSearch, FaShoppingBag, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FormEvent, useContext } from 'react';
import EcommerceContext from '../../context/EcommerceContext';
import styles from './Header.module.css';
import useAuth from '../../hooks/useAuth';
import userImg from '../../assets/images/userImg.png';

export default function Header() {
  const { cartAmount } = useContext(EcommerceContext);
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userData, isLoading } = useAuth();

  const getProductByQuery = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const inputElement = formElement.elements[0] as HTMLInputElement;
    const inputValue = inputElement.value.trim();
    if (!inputValue) return;
    setSearchParams({ search: inputValue, offset: '0' });
    navigate(`/?search=${inputValue}&offset=0`);
  };

  return (
    <header className={styles.header}>
      <Link to='/'>
        <h1 className={styles.title}>E-CommerceX</h1>
      </Link>
      <form onSubmit={getProductByQuery} className={styles.searchForm}>
        <input
          type='search'
          className={styles.searchBar}
          placeholder='Buscar produtos'
        />
        <button type='submit' className={styles.searchButton}>
          <FaSearch />
        </button>
      </form>
      <section className={styles.rightContainer}>
        {isLoading ? (
          <span>Carregando...</span>
        ) : (
          userData ? (
            <Link to='/profile' className={styles.userProfile}>
              <img src={userImg} alt='Foto de Perfil' className={styles.userImg} />
              <p className={styles.userName}>{userData.name}</p>
            </Link>
          ) : (
            <Link to='/login' className={styles.loginLink}>
              Fazer login
            </Link>
          )
        )}
        <nav className={styles.routes}>
          <Link to='/cart' className={styles.link}>
            <div className={styles.cartContainer}>
              <FaShoppingCart className={styles.icons} />
              {cartAmount > 0 && (
                <span className={styles.cartCount}>
                  {cartAmount > 99 ? '99+' : cartAmount}
                </span>
              )}
            </div>
            <p className={styles.linkName}>Carrinho</p>
          </Link>
          <Link to='/favorites' className={styles.link}>
            <FaHeart className={styles.icons} />
            <p className={styles.linkName}>Favoritos</p>
          </Link>
          <Link to='/purchases' className={styles.link}>
            <FaShoppingBag className={styles.icons} />
            <p className={styles.linkName}>Minhas Compras</p>
          </Link>
        </nav>
      </section>
    </header>
  );
}
