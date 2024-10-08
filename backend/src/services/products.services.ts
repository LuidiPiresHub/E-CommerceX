import { PrismaClient } from '@prisma/client';
import { IProductDetail, IProductService } from '../interfaces/products.interface';
import { PrismaError } from '../interfaces/prisma.interface';
import { ICartProduct } from '../interfaces/cart.interface';

const prisma = new PrismaClient();

const createProduct = async (cartItems: ICartProduct[], userId: string): Promise<IProductService> => {
  await Promise.all(cartItems.map(async (product) => {
    return await prisma.purchases.create({
      data: {
        users_id: userId,
        purchased_product_id: product.id,
        purchased_product_name: product.title,
        purchased_product_price: product.price,
        purchased_product_thumbnail: product.thumbnail,
        purchased_product_quantity: product.quantity,
      }
    });
  }));
  return { type: 'OK', message: 'Product created' };
};

const favoriteProduct = async (users_id: string, product: IProductDetail): Promise<IProductService> => {
  try {
    await prisma.favorites.create({
      data: {
        users_id,
        favorited_product_id: product.id,
        favorited_product_name: product.title,
        favorited_product_price: product.price,
        favorited_product_thumbnail: product.thumbnail,
      },
    });
    return { type: 'OK', message: 'Favorited successfully' };
  } catch (error) {
    return { type: 'INTERNAL', message: 'Falha ao favoritar' };
  }
};

const getFavoriteStatus = async (productId: string): Promise<IProductService> => {
  try {
    const existingFavorite = await prisma.favorites.findFirst({ where: { favorited_product_id: productId } });
    return { type: 'OK', message: existingFavorite ? true : false };
  } catch (error) {
    return { type: 'INTERNAL', message: 'Falha ao buscar status de favorito' };
  }
};

const getFavoriteProducts = async (userId: string, page: number = 1): Promise<IProductService> => {
  const limit = 10;
  const offset = (page - 1) * limit;

  const [products, totalProducts] = await prisma.$transaction([
    prisma.favorites.findMany({
      where: {
        users_id: userId
      },
      orderBy: {
        created_at: 'desc'
      },
      take: limit,
      skip: offset
    }),
    prisma.favorites.count({ where: { users_id: userId } }),
  ]);

  if (!products.length) return { type: 'NOT_FOUND', message: 'Nenhum produto favoritado' };

  const pageCount = Math.ceil(totalProducts / limit);
  return { type: 'OK', message: { products, pageCount } };
};

const unfavoriteProduct = async (productId: string, users_id: string): Promise<IProductService> => {
  try {
    await prisma.favorites.delete({
      where: {
        favorited_product_id_users_id: {
          favorited_product_id: productId,
          users_id,
        },
      }
    });
    return { type: 'OK', message: 'Unfavorited successfully' };
  } catch (error) {
    const prismaError = error as PrismaError;
    if (prismaError.code === 'P2025') {
      return { type: 'NOT_FOUND', message: 'Produto já deletado ou não encontrado' };
    }
    return { type: 'INTERNAL', message: 'Falha ao desfavoritar' };
  }
};

const getPurchases = async (userId: string, page: number = 1): Promise<IProductService> => {
  const limit = 10;
  const offset = (page - 1) * limit;

  const [purchases, totalPurchases] = await prisma.$transaction([
    prisma.purchases.findMany({
      where: {
        users_id: userId
      },
      orderBy: {
        created_at: 'desc'
      },
      take: limit,
      skip: offset,
    }),
    prisma.purchases.count({ where: { users_id: userId } })
  ]);

  const pageCount = Math.ceil(totalPurchases / limit);
  return { type: 'OK', message: { purchases, pageCount } };
};

export default {
  createProduct,
  favoriteProduct,
  getFavoriteStatus,
  getFavoriteProducts,
  unfavoriteProduct,
  getPurchases,
};
