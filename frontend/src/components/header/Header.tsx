import { FormEvent, useContext, useState } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle, FaHouseUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import styles from './Header.module.css';
import EcommerceContext from '../../context/EcommerceContext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useWindowWidth from '../../hooks/useWindowWidth';

export default function Header() {
  const { cartAmount } = useContext(EcommerceContext);
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, userData, logout } = useAuth();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const width = useWindowWidth();

  const getProductByQuery = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setMenuIsOpen(false);
    const formElement = event.target as HTMLFormElement;
    const inputElement = formElement.elements[0] as HTMLInputElement;
    const inputValue = inputElement.value.trim();
    setSearchParams({ search: inputValue, offset: '0' });
    navigate(`/?search=${inputValue}&offset=0`);
  };

  const openMobileMenu = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = !menuIsOpen ? 'hidden' : 'auto';
    setMenuIsOpen((prevState) => !prevState);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={() => navigate('/')}>E-CommerceX</h1>
      <button className={styles.mobileMenuBtn} onClick={openMobileMenu}>
        <span className={`${styles.bar} ${menuIsOpen ? styles.barActive : ''}`.trim()}></span>
        <span className={`${styles.bar} ${menuIsOpen ? styles.barActive : ''}`.trim()}></span>
        <span className={`${styles.bar} ${menuIsOpen ? styles.barActive : ''}`.trim()}></span>
      </button>
      <form className={styles.searchWrapper} onSubmit={getProductByQuery}>
        <input
          type='search'
          className={styles.searchBar}
          placeholder='Buscar produtos'
        />
        <button type='submit' className={styles.searchButton}>
          <FaSearch />
        </button>
      </form>
      <section className={styles.sectionWrapper}>

        {width > 768 ? (
        // Desktop
          <section className={`${menuIsOpen ? styles.menuOpen : styles.menuClosed}`}>
            {isAuthenticated && userData ? (
              <div className={styles.userWrapper}>
                {userData.profileImage ? (
                  <img src={userData.profileImage} alt='Foto de perfil' className={styles.userIcon} />
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
                  <span className={styles.test}>Faça <Link to='/login' className={styles.link}>Login</Link> ou</span>
                  <span>Crie seu <Link to='/register' className={styles.link}>Cadastro</Link></span>
                </div>
              </div>
            )}
          </section>
        ) : (
        // Mobile
          <section className={`${styles.sectionWrapper} ${menuIsOpen ? styles.menuOpen : styles.menuClosed}`}>
            <div className={styles.userContent}>
              <h1>E-CommerceX</h1>
              <div className={styles.username}>
                {isAuthenticated && userData ? (
                  <>
                    {userData.profileImage ? (
                      <img src={userData.profileImage} alt='Foto de perfil' />
                    ) : (
                      <FaUserCircle className={styles.userIcon} />
                    )}
                    <span className={styles.currentUser}>{`Olá, ${userData.name}`}</span>
                  </>
                ) : (
                  <>
                    <FaUserCircle className={styles.userIcon} />
                    <span className={styles.currentUser}>Olá. Faça seu login</span>
                  </>
                )}
              </div>
              <ul className={styles.ul}>
                <li>
                  <FaHouseUser />
                  <Link to='/profile'>Minha conta</Link>
                </li>
                <li>
                  <FaHeart />
                  <Link to='/favorites'>Favoritos</Link>
                </li>
                <li>
                  <FaShoppingBag />
                  <Link to='/purchases'>Meus Pedidos</Link>
                </li>
              </ul>
            </div>
            <div className={styles.btnWrapper}>
              {isAuthenticated ? (
                <button onClick={logout} className={styles.btn}>Sair</button>
              ) : (
                <>
                  <Link to='/login' className={styles.btn}>Login</Link>
                  <Link to='/register' className={styles.btn}>Cadastro</Link>
                </>
              )}
            </div>
          </section>
        )}

        <section className={styles.routesContainer}>
          <Link to='/cart' className={styles.cart}>
            {cartAmount > 0 && (
              <span className={styles.cartAmount}>{cartAmount}</span>
            )}
            <FaShoppingCart className={styles.icons} />
          </Link>
          <Link to='/favorites'>
            <FaHeart className={styles.icons} />
          </Link>
          <Link to='/purchases'>
            <FaShoppingBag className={styles.icons} />
          </Link>
        </section>
      </section>
    </header >
  );
}
