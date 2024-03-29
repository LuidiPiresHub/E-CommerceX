import { IProductCart } from '../interfaces/products.interface';

export const formartPrice = (price: number): string => price.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' });
export const countCartItems = (cartItems: IProductCart[]): number => cartItems.reduce((acc, curr) => acc + curr.quantity!, 0);
export const calcCartItemsPrice = (cartItems: IProductCart[]): number => cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity!, 0);
export const getHightestQuality = (image: string): string => image.replace(/\w\.jpg/gi, 'W.jpg');
