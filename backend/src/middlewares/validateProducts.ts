import { favoriteProductSchema } from '../schemas/productSchema';
import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export const validateFavoriteProduct = async (req: Request, res: Response, next: NextFunction)
: Promise<Response | void> => {
  const { product } = req.body;
  try {
    await favoriteProductSchema.validate(product);
    return next();
  } catch (error) {
    const err = error as Yup.ValidationError;
    return res.status(400).json({ message: err.message });
  }
};
