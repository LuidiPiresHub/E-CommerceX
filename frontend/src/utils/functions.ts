import { IProductCart } from '../interfaces/products.interface';

export const formartPrice = (price: number): string => price.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' });

export const countCartItems = (cartItems: IProductCart[]): number => cartItems.reduce((acc, curr) => acc + curr.quantity!, 0);

export const calcCartItemsPrice = (cartItems: IProductCart[]): number => cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity!, 0);

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

export const formatPhoneNumber = (phone: string) => {
  const phoneNumber = phone.replace(/\D/g, '');
  const dddLength = phoneNumber.length > 11 ? 3 : 2;
  const phoneRegex = `^(\\d{${dddLength}})(\\d{5})(\\d{4}).*`;
  const phoneFormat = '($1) $2-$3';
  return phoneNumber.replace(new RegExp(phoneRegex), phoneFormat);
};
