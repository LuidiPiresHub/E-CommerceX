import { Request, Response } from 'express';
import cartServices from '../services/cart.services';
import { mapStatus } from '../utils/mapStatus';

const getCartItems = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { type, message } = await cartServices.getCartItems(id);
  return res.status(mapStatus(type)).json({ message });
};

const createCartItem = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { cart } = req.body;
  const { type, message } = await cartServices.createCartItem(id, cart);
  return res.status(mapStatus(type)).json({ message });
};

const updateCartQuantity = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { productId } = req.params;
  const { quantity } = req.body;
  const { type, message } = await cartServices.updateCartQuantity(id, productId, quantity);
  return res.status(mapStatus(type)).json({ message });
};

const deleteCart = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { type, message } = await cartServices.deleteCart(id);
  return res.status(mapStatus(type)).json({ message });
};

const deleteCartItem = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { productId } = req.params;
  const { type, message } = await cartServices.deleteCartItem(id, productId);
  return res.status(mapStatus(type)).json({ message });
};

export default {
  getCartItems,
  createCartItem,
  updateCartQuantity,
  deleteCart,
  deleteCartItem
};
