import { Request, Response } from 'express';
import productsServices from '../services/products.services';

const createProduct = async (req: Request, res: Response) => {
  const product = await productsServices.createProduct(req.body);
  return res.status(201).json({ message: product });
};

export default {
  createProduct,
};
