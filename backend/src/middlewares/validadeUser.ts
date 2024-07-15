import { Request, Response, NextFunction } from 'express';
import { userLoginSchema, userRegisterSchema, userUpdateSchema } from '../schemas/userSchema';
import * as Yup from 'yup';

export const validadeUserRegister = async (req: Request, res: Response, next: NextFunction)
: Promise<Response | void> => {
  try {
    await userRegisterSchema.validate(req.body);
    return next();
  } catch (error) {
    const err = error as Yup.ValidationError;
    return res.status(400).json({ message: err.message });
  }
};

export const validadeUserLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await userLoginSchema.validate(req.body);
    return next();
  } catch (error) {
    const err = error as Yup.ValidationError;
    return res.status(400).json({ message: err.message });
  }
};

export const validateUserUpdate = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await userUpdateSchema.validate(req.body);
    return next();
  } catch (error) {
    const err = error as Yup.ValidationError;
    return res.status(400).json({ message: err.message });
  }
};
