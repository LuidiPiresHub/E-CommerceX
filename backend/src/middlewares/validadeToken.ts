/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../auth/jwtFunctions';
import { TokenData } from '../interfaces/jwt.interface';

declare global {
  namespace Express {
    interface Request {
      user: TokenData;
    }
  }
}

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Token não enviado' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Token invalido ou expirado' });
  }
  req.user = decoded as TokenData;

  return next();
};

export default validateToken;
