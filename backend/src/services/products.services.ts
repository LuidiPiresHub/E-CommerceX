import Product from '../database/models/products.models';
import IProduct from '../interfaces/products.interface';

const createProduct = async (product: IProduct) => {
  return await Product.create({ ...product });
};

export default {
  createProduct,
};
