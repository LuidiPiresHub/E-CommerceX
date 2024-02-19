import { PrismaClient } from '@prisma/client';
import { IStripeProduct } from '../interfaces/stripe.interface';
import { IProductService } from '../interfaces/products.interface';

const prisma = new PrismaClient();

const createProduct = async (cartItems: IStripeProduct[]): Promise<IProductService> => {
  await Promise.all(cartItems.map(async (product) => {
    return await prisma.product.create({ data: { ...product } });
  }));
  return { type: 'OK', message: 'Product created' };
};

const getAllProducts = async (): Promise<IProductService> => {
  const products = await prisma.product.findMany();
  return { type: 'OK', message: products };
};

const getProductById = async (id: string): Promise<IProductService> => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: 'OK', message: product };
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
};
