import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import styles from './CheckoutSuccess.module.css';
import Confetti from 'react-confetti';

export default function CheckoutSuccess() {
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const detectResize = () => setScreenSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', detectResize);

    return () => {
      window.removeEventListener('resize', detectResize);
    };
  }, [screenSize]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCount) => prevCount - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/purchases');
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);


  return (
    <>
      <Confetti width={screenSize.width} height={screenSize.height} />
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Compra efetuada com sucesso</h1>
        <p className={styles.countdown}>{countdown > 1
          ? `Você será redirecionado em ${countdown} segundos...`
          : countdown === 1
            ? `Você será redirecionado em ${countdown} segundo...`
            : 'Redirecionando...'}</p>
      </main >
    </>
  );
}
