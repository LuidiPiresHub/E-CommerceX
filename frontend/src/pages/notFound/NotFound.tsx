import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'E-CommerceX - Página não encontrada';
  }, []);

  const navigate = useNavigate();
  return (
    <main className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>404</h1>
      <p className={styles.notFoundMessage}>Página não encontrada</p>
      <button type='button' onClick={() => navigate(-1)} className={styles.notFoundButton}>Voltar</button>
    </main>
  );
}
