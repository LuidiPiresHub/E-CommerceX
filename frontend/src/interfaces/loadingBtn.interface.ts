import { ReactNode } from 'react';

export interface LoadingBtnProps {
  children: ReactNode;
  onClick?: () => void;
  BtnClassName?: string;
  loadClassName?: string;
  type?: 'button' | 'submit' | 'reset';
}
