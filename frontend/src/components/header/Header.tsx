import { FormEvent, useContext } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import styles from './Header.module.css';
import EcommerceContext from '../../context/EcommerceContext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Header() {
  const { cartAmount } = useContext(EcommerceContext);
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, userData, logout } = useAuth();

  const getProductByQuery = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const inputElement = formElement.elements[0] as HTMLInputElement;
    const inputValue = inputElement.value.trim();
    setSearchParams({ search: inputValue, offset: '0' });
    navigate(`/?search=${inputValue}&offset=0`);
  };

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
        <section>
          {isAuthenticated && userData ? (
            <div className={styles.userWrapper}>
              {userData.profileImage ? (
                <img src={userData.profileImage} alt="" className={styles.userIcon} />
              ) : (
                <FaUserCircle className={styles.userIcon} />
              )}
              <div>
                <span className={styles.currentUser}>{`Olá, ${userData.name}`}</span>
                <div className={styles.userRedirect}>
                  <Link to='/profile'>Minha conta</Link>
                  <span>|</span>
                  <button onClick={logout} className={styles.logoutBtn}>Sair</button>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.userWrapper}>
              <FaUserCircle className={styles.userIcon} />
              <div className={styles.redirect}>
                <span>Faça <Link to="/login" className={styles.link}>Login</Link> ou</span>
                <span>Crie seu <Link to="/register" className={styles.link}>Cadastro</Link></span>
              </div>
            </div>
          )}
        </section>
        <Link to='/cart' className={styles.cart}>
          {cartAmount > 0 && (
            <span className={styles.cartAmount}>{cartAmount}</span>
          )}
          <FaShoppingCart className={styles.cartIcon} />
        </Link>
      </section>
    </header >
  );
}
