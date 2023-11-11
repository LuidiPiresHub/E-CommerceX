import { Request, Response } from 'express';
import productsServices from '../services/products.services';
import { mapStatus } from '../utils/mapStatus';

const createProduct = async (req: Request, res: Response) => {
  const product = await productsServices.createProduct(req.body);
  return res.status(201).json({ message: product });
};

const getProducts = async (req: Request, res: Response) => {
  const query = req.query.q as string | undefined;
  const { type, message } = await productsServices.getProducts(query);
  return res.status(mapStatus(type)).json({ message });
};

const getProductById = async (req: Request, res: Response) => {
  const { type, message } = await productsServices.getProductById(Number(req.params.id));
  return res.status(mapStatus(type)).json({ message });
};

export default {
  createProduct,
  getProducts,
  getProductById,
};
