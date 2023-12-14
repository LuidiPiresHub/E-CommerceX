import { Router } from 'express';
import productsControllers from '../controller/products.controllers';
import validateSearchParams from '../middlewares/validateSearchParams ';

const productRoutes = Router();

productRoutes.post('/', productsControllers.createProduct);
productRoutes.get('/', productsControllers.getAllProducts);
productRoutes.get('/search', validateSearchParams, productsControllers.getProductByName);
productRoutes.get('/:id', productsControllers.getProductById);

export default productRoutes;
