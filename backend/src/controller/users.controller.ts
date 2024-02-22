import { Request, Response } from 'express';
import userServices from '../services/user.services';
import { mapStatus } from '../utils/mapStatus';

const register = async (req: Request, res: Response) => {
  const { userData } = req.body;
  const { type, message } = await userServices.register(userData);
  const status = mapStatus(type);
  if (status === 201) {
    return res.cookie('token', message, { httpOnly: true, sameSite: 'strict', secure: true })
      .status(status).json({ message: 'Usuário criado com sucesso' });
  }
  return res.status(status).send({ message });
};

export default {
  register,
};
