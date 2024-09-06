import styles from './LoadingBtn.module.css';
import { LoadingBtnProps } from '../../interfaces/loadingBtn.interface';

export default function LoadingBtn({ children, isLoading, onClick, className, type, disabled }: LoadingBtnProps) {
  return (
    <button
      type={type ? type : 'button'}
      onClick={onClick}
      className={className}
      disabled={isLoading || disabled}
    >
      {children}
      {isLoading && <div className={styles.loading}></div>}
    </button>
  );
}
