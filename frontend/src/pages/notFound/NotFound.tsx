import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <main className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>404</h1>
      <p className={styles.notFoundMessage}>Página não encontrada</p>
      <Link className={styles.notFoundButton} to='/'>Voltar</Link>
    </main>
  );
}
