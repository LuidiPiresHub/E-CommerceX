import { Request, Response } from 'express';
import productsServices from '../services/products.services';
import { mapStatus } from '../utils/mapStatus';

const createProduct = async (req: Request, res: Response) => {
  const product = await productsServices.createProduct(req.body);
  return res.status(201).json({ message: product });
};

const getAllProducts = async (req: Request, res: Response) => {
  const productName = req.query.name as string | undefined;
  const formattedName = productName?.trim();
  const { type, message } = await productsServices.getAllProducts(formattedName);
  return res.status(mapStatus(type)).json({ message });
};

const getProductById = async (req: Request, res: Response) => {
  const productId = Number(req.params.id);
  const { type, message } = await productsServices.getProductById(productId);
  return res.status(mapStatus(type)).json({ message });
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
};
