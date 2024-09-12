import { PrismaClient } from '@prisma/client';
import {
  ICartProduct,
  ICreateCartItem,
  IDeleteCart,
  IGetCartItems,
  IUpdateCartQuantity
} from '../interfaces/cart.interface';
import { PrismaError } from '../interfaces/prisma.interface';

const prisma = new PrismaClient();

const getCartItems = async (userId: string): Promise<IGetCartItems> => {
  const cartItems = await prisma.cart.findMany({ where: { user_id: userId }, orderBy: { created_at: 'desc' } });
  return { type: 'OK', message: cartItems };
};

const createCartItem = async (userId: string, product: ICartProduct): Promise<ICreateCartItem> => {
  try {
    const cartItem = await prisma.cart.create({
      data: {
        user_id: userId,
        cart_product_id: product.id,
        cart_product_title: product.title,
        cart_product_price: product.price,
        cart_product_quantity: product.quantity,
        cart_product_thumbnail: product.thumbnail,
      }
    });
    return { type: 'OK', message: cartItem };
  } catch (error) {
    const err = error as PrismaError;
    if (err.code === 'P2002') return { type: 'CONFLICT', message: 'Product already in cart' };
    throw err;
  }
};

const updateCartQuantity = async (userId: string, productId: string, quantity: number)
  : Promise<IUpdateCartQuantity> => {
  const updatedCart = await prisma.cart.update({
    data: {
      cart_product_quantity: quantity
    },
    where: {
      cart_product_id_user_id: {
        cart_product_id: productId,
        user_id: userId
      }
    }
  });

  return { type: 'OK', message: updatedCart };
};

const deleteCart = async (userId: string): Promise<IDeleteCart> => {
  await prisma.cart.deleteMany({ where: { user_id: userId } });
  return { type: 'NO_CONTENT', message: 'Cart deleted' };
};

const deleteCartItem = async (userId: string, productId: string): Promise<IDeleteCart> => {
  await prisma.cart.delete({
    where: {
      cart_product_id_user_id: {
        cart_product_id: productId,
        user_id: userId
      }
    }
  });
  return { type: 'NO_CONTENT', message: 'Cart item deleted' };
};

export default {
  getCartItems,
  createCartItem,
  updateCartQuantity,
  deleteCart,
  deleteCartItem
};
