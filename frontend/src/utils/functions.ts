import { format, parse } from 'date-fns';
import axios from 'axios';
import { ICart } from '../interfaces/cart.interface';

export const formartPrice = (price: number): string => price.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' });

export const countCartItems = (cartItems: ICart[]): number => cartItems.reduce((acc, curr) => acc + curr.cart_product_quantity, 0);

export const calcCartItemsPrice = (cartItems: ICart[]): number => cartItems.reduce((acc, curr) => acc + curr.cart_product_price * curr.cart_product_quantity, 0);

export const getHightestQuality = (image: string): string => image.replace(/\w\.jpg/gi, 'W.jpg');

export const calculateAge = (birthdate: Date): number => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const formatBirthdate = (birthdate: Date | string): string => {
  const date = new Date(birthdate).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  const parsedData = parse(date, 'dd/MM/yyyy', new Date());
  return format(parsedData, 'yyyy-MM-dd');
};

export const urlToFile = async (imageUrl: string): Promise<File> => {
  try {
    const { headers, data } = await axios.get(imageUrl, { responseType: 'blob' });
    const contentType = headers['content-type'];
    const blob = new Blob([data], { type: contentType });
    return new File([blob], contentType, { type: blob.type });
  } catch (error) {
    throw new Error(`Erro ao converter URL para File: ${error}`);
  }
};
