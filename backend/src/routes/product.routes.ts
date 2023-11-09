import { Router } from 'express';
import productsControllers from '../controller/products.controllers';

const productRoutes = Router();

productRoutes.post('/', productsControllers.createProduct);

export default productRoutes;
