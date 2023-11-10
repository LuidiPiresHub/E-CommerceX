import { Router } from 'express';
import productsControllers from '../controller/products.controllers';

const productRoutes = Router();

productRoutes.post('/', productsControllers.createProduct);
productRoutes.get('/', productsControllers.getProducts);
productRoutes.get('/:id', productsControllers.getProductById);

export default productRoutes;
