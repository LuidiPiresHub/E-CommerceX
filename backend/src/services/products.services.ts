// import Product from '../database/models/products.models';
import { IProduct, IService } from '../interfaces/products.interface';
// import { Op } from 'sequelize';

const createProduct = async (_product: IProduct) => {
  return await 'Product.create({ ...product })';
};

const getAllProducts = async (_name?: string): Promise<IService> => {
  // const whereClause = name ? { productName: { [Op.like]: `%${name}%` } } : {};
  // const data = await Product.findAll({ where: whereClause });
  // const products = data.map(({ dataValues }) => dataValues);
  // if (!products.length) return { type: 'NOT_FOUND', message: 'Produtos não encontrados' };
  return { type: 'OK', message: 'products' };
};

const getProductById = async (_id: number): Promise<IService> => {
  // const product = await Product.findByPk(id);
  // if (!product) return { type: 'NOT_FOUND', message: 'Produto não encontrado' };
  return { type: 'OK', message: 'product.dataValues' };
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
};
