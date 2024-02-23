import { Request, Response } from 'express';
import { mapStatus } from '../utils/mapStatus';
import productsServices from '../services/products.services';

const getAllProducts = async (_req: Request, res: Response): Promise<Response> => {
  const { type, message } = await productsServices.getAllProducts();
  return res.status(mapStatus(type)).json({ message });
};

const getProductById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { type, message } = await productsServices.getProductById(id);
  return res.status(mapStatus(type)).json({ message });
};

export default {
  getAllProducts,
  getProductById,
};
