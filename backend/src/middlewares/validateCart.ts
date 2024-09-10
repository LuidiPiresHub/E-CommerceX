import { NextFunction, Request, Response } from 'express';
import { cartPostSchema, cartPutSchema } from '../schemas/cartSchema';
import * as Yup from 'yup';

export const validadeCartPost = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await cartPostSchema.validate(req.body);
    return next();
  } catch (error) {
    const err = error as Yup.ValidationError;
    return res.status(400).json({ message: err.message });
  }
};

export const validateCartPut = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await cartPutSchema.validate(req.body);
    return next();
  } catch (error) {
    const err = error as Yup.ValidationError;
    return res.status(400).json({ message: err.message });
  }
};
