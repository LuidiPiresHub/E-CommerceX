import { Request, Response } from 'express';
import { mapStatus } from '../utils/mapStatus';
import productsServices from '../services/products.services';

const favoriteProduct = async (req: Request, res: Response): Promise<Response> => {
  const { product } = req.body;
  const { id } = req.user;
  const { type, message } = await productsServices.favoriteProduct(id, product);
  return res.status(mapStatus(type)).json({ message });
};

const getFavoriteStatus = async (req: Request, res: Response): Promise<Response> => {
  const { id: productId } = req.params;
  const { type, message } = await productsServices.getFavoriteStatus(productId);
  return res.status(mapStatus(type)).json({ message });
};

const getFavoriteProducts = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.user;
  const { type, message } = await productsServices.getFavoriteProducts(id);
  return res.status(mapStatus(type)).json({ message });
};

const unfavoriteProduct = async (req: Request, res: Response): Promise<Response> => {
  const { id: productId } = req.params;
  const { id } = req.user;
  const { type, message } = await productsServices.unfavoriteProduct(productId, id);
  return res.status(mapStatus(type)).json({ message });
};

const getPurchases = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.user;
  const { message } = await productsServices.getPurchases(id);
  return res.status(200).json({ message });
};

export default {
  favoriteProduct,
  getFavoriteStatus,
  getFavoriteProducts,
  unfavoriteProduct,
  getPurchases,
};
