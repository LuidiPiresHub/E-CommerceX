import { ReactNode } from 'react';

export interface LoadingBtnProps {
  children: ReactNode;
  isLoading: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}
