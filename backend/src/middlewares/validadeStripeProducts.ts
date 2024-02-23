import { Request, Response, NextFunction } from 'express';
import { IStripeProduct } from '../interfaces/stripe.interface';
import * as Yup from 'yup';
import { productSchema } from '../schemas/stripeSchema';

const validadeStripeProducts = async (req: Request, res: Response, next: NextFunction) => {
  const products: IStripeProduct[] = req.body.products;

  if (!Array.isArray(products)) {
    return res.status(400).json({ message: 'Products should be an array' });
  }

  try {
    await Promise.all(products.map(async (product) => {
      if (typeof product.price !== 'number') {
        throw new Yup.ValidationError('Price should be a number', product, 'price', product.price);
      }
      if (typeof product.quantity !== 'number') {
        throw new Yup.ValidationError('Quantity should be a number', product, 'quantity', product.quantity);
      }
      await productSchema.validate(product);
    }));
    return next();
  } catch (error) {
    const err = error as Yup.ValidationError;
    return res.status(400).json({ message: err.errors });
  }
};

export default validadeStripeProducts;
