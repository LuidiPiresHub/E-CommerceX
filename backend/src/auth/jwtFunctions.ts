import jwt from 'jsonwebtoken';
import { TokenData } from '../interfaces/jwt.interface';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET as string;

export const generateToken = (data: TokenData): string => jwt.sign(data, secret, { expiresIn: '7d' });

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};
