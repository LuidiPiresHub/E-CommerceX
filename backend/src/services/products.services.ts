import Product from '../database/models/products.models';
import { IProduct, IService } from '../interfaces/products.interface';

const createProduct = async (product: IProduct) => {
  return await Product.create({ ...product });
};

const getProducts = async (query: string | undefined): Promise<IService> => {
  const config = query ? { productName: query } : undefined;
  const data = await Product.findAll({ where: config });
  const products = data.map(({ dataValues }) => dataValues);
  console.log(products);
  if (!products.length) return { type: 'NOT_FOUND', message: 'Products not found' };
  return { type: 'OK', message: products };
};

const getProductById = async (id: number): Promise<IService> => {
  const product = await Product.findByPk(id);
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: 'OK', message: product.dataValues };
};

export default {
  createProduct,
  getProducts,
  getProductById,
};
