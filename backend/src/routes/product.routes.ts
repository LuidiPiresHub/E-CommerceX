import { Router } from 'express';
import productsControllers from '../controller/products.controllers';
import validateToken from '../middlewares/validadeToken';
import { validateFavoriteProduct } from '../middlewares/validateProducts';

const productRoutes = Router();

productRoutes.post('/favorite', validateToken, validateFavoriteProduct, productsControllers.favoriteProduct);
productRoutes.get('/favorite/:id', validateToken, productsControllers.getFavoriteStatus);
productRoutes.get('/favorites', validateToken, productsControllers.getFavoriteProducts);
productRoutes.delete('/favorite/:id', validateToken, productsControllers.unfavoriteProduct);
productRoutes.get('/purchases', validateToken, productsControllers.getPurchases);

export default productRoutes;
