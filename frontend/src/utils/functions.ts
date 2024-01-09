import IProduct from '../interfaces/products.interface';

export const formartPrice = (price: number): string => price.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' });
export const countCartItens = (cartItems: IProduct[]): number => cartItems.reduce((acc, curr) => acc + curr.quantity!, 0);
export const calcCartItemsPrice = (cartItems: IProduct[]): number => cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity!, 0);
