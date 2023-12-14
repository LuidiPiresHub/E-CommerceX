import Product from '../database/models/products.models';
import { IProduct, IService } from '../interfaces/products.interface';
import { Op } from 'sequelize';

const createProduct = async (product: IProduct) => {
  return await Product.create({ ...product });
};

const getAllProducts = async (): Promise<IService> => {
  const data = await Product.findAll();
  const products = data.map(({ dataValues }) => dataValues);
  if (!products.length) return { type: 'NOT_FOUND', message: 'Products not found' };
  return { type: 'OK', message: products };
};

const getProductByName = async (name: string): Promise<IService> => {
  const data = await Product.findAll({ where: { productName: { [Op.like]: `%${name}%` } } });
  const products = data.map(({ dataValues }) => dataValues);
  if (!products.length) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: 'OK', message: products };
};

const getProductById = async (id: number): Promise<IService> => {
  const product = await Product.findByPk(id);
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: 'OK', message: product.dataValues };
};

export default {
  createProduct,
  getAllProducts,
  getProductByName,
  getProductById,
};
