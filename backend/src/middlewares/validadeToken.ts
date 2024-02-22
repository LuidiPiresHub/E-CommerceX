import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../auth/jwtFunctions';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Token não enviado' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Token invalido ou expirado' });
  }

  req.body.user = decoded;
  return next();
};

export default validateToken;
