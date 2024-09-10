import { Router } from 'express';
import cartController from '../controller/cart.controller';
import validateToken from '../middlewares/validadeToken';
import { validadeCartPost, validateCartPut } from '../middlewares/validateCart';

const cartRouter = Router();

cartRouter.get('/', validateToken, cartController.getCartItems);
cartRouter.post('/', validateToken, validadeCartPost, cartController.createCartItem);
cartRouter.put('/:productId', validateToken, validateCartPut, cartController.updateCartQuantity);
cartRouter.delete('/', validateToken, cartController.deleteCart);
cartRouter.delete('/:productId', validateToken, cartController.deleteCartItem);

export default cartRouter;
