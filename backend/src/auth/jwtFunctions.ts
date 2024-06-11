import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUserData } from '../interfaces/users.interface';
dotenv.config();

const secret = process.env.JWT_SECRET as string;

export const generateToken = (data: IUserData): string => jwt.sign(data, secret, { expiresIn: '7d' });

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};
