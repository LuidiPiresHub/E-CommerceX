import { useContext } from 'react';
import styles from './LoadingBtn.module.css';
import { LoadingBtnProps } from '../../interfaces/loadingBtn.interface';
import EcommerceContext from '../../context/EcommerceContext';

export default function LoadingBtn({ children, onClick, BtnClassName, loadClassName }: LoadingBtnProps) {
  const { isLoading } = useContext(EcommerceContext);
  return (
    <button
      type='button'
      style={{ position: 'relative' }}
      onClick={onClick} className={BtnClassName ? BtnClassName : styles.button}
    >
      {isLoading ? (
        <div className={loadClassName ? loadClassName : styles.loading}></div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
