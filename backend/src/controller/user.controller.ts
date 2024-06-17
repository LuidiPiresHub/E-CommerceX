import { CookieOptions, Request, Response } from 'express';
import userServices from '../services/user.services';
import { mapStatus } from '../utils/mapStatus';

const cookieConfig: CookieOptions = { httpOnly: true, sameSite: 'none', secure: true };

const getUser = async (req: Request, res: Response): Promise<Response> => {
  const { iat, exp, ...userData } = req.user;
  return res.status(200).json({ message: userData });
};

const register = async (req: Request, res: Response): Promise<Response> => {
  const { userData } = req.body;
  const { type, message } = await userServices.register(userData);
  const status = mapStatus(type);
  if (status === 201) {
    return res.cookie('token', message, cookieConfig).send();
  }
  return res.status(status).json({ message });
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const { userData } = req.body;
  const { type, message } = await userServices.login(userData);
  const status = mapStatus(type);
  if (status === 200) {
    return res.cookie('token', message, cookieConfig)
      .status(status).json({ message: 'Usuário logado com sucesso' });
  }
  return res.status(status).json({ message });
};

const logout = async (_req: Request, res: Response): Promise<Response> => {
  return res.clearCookie('token', cookieConfig).send();
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.user;
  const { body, file } = req;
  const { type, message } = await userServices.updateUser(id, body, file?.buffer);
  const status = mapStatus(type);
  if (status === 200) {
    return res.cookie('token', message, cookieConfig)
      .status(status).json({ message: 'Token atualizado com sucesso' });
  }
  return res.status(status).json({ message });
};

export default {
  register,
  login,
  getUser,
  logout,
  updateUser,
};
