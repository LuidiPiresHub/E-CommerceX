import { CookieOptions, Request, Response } from 'express';
import userServices from '../services/user.services';
import { mapStatus } from '../utils/mapStatus';

const cookieConfig: CookieOptions = { httpOnly: true, sameSite: 'strict', secure: true };

const getUser = async (req: Request, res: Response): Promise<Response> => {
  const { user } = req.body;
  return res.status(200).json({ message: user });
};

const register = async (req: Request, res: Response): Promise<Response> => {
  const { userData } = req.body;
  const { type, message } = await userServices.register(userData);
  const status = mapStatus(type);
  if (status === 201) {
    return res.cookie('token', message, cookieConfig)
      .status(status).json({ message: 'Usuário criado com sucesso' });
  }
  return res.status(status).send({ message });
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const { userData } = req.body;
  const { type, message } = await userServices.login(userData);
  const status = mapStatus(type);
  if (status === 200) {
    return res.cookie('token', message, cookieConfig)
      .status(status).json({ message: 'Usuário logado com sucesso' });
  }
  return res.status(status).send({ message });
};

const updateProfile = async (req: Request, res: Response): Promise<Response> => {
  const { userData } = req.body;
  const { type, message } = await userServices.updateProfile(userData);
  return res.status(mapStatus(type)).send({ message });
};

export default {
  register,
  login,
  getUser,
  updateProfile,
};
