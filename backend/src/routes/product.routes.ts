import { Router } from 'express';
import productsControllers from '../controller/products.controllers';
import validateToken from '../middlewares/validadeToken';

const productRoutes = Router();

productRoutes.post('/favorite', validateToken, productsControllers.favoriteProduct);
productRoutes.get('/favorite/:id', validateToken, productsControllers.getFavoriteStatus);
productRoutes.get('/favorites', validateToken, productsControllers.getFavoriteProducts);
productRoutes.delete('/favorite/:id', validateToken, productsControllers.unfavoriteProduct);

export default productRoutes;
