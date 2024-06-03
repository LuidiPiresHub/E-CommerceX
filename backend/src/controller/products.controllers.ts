import { Request, Response } from 'express';
import { mapStatus } from '../utils/mapStatus';
import productsServices from '../services/products.services';

const favoriteProduct = async (req: Request, res: Response): Promise<Response> => {
  const { user: { id }, product } = req.body;
  const { type, message } = await productsServices.favoriteProduct(id, product);
  return res.status(mapStatus(type)).json({ message });
};

const getFavoriteStatus = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { type, message } = await productsServices.getFavoriteStatus(id);
  return res.status(mapStatus(type)).json({ message });
};

const getFavoriteProducts = async (req: Request, res: Response): Promise<Response> => {
  const { user: { id } } = req.body;
  const { type, message } = await productsServices.getFavoriteProducts(id);
  return res.status(mapStatus(type)).json({ message });
};

const unfavoriteProduct = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { user: { id: users_id } } = req.body;
  const { type, message } = await productsServices.unfavoriteProduct(id, users_id);
  return res.status(mapStatus(type)).json({ message });
};

export default {
  favoriteProduct,
  getFavoriteStatus,
  getFavoriteProducts,
  unfavoriteProduct,
};
