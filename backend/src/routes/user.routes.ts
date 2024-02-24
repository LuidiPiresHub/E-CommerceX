import { Router } from 'express';
import usersController from '../controller/user.controller';
import validateToken from '../middlewares/validadeToken';

const usersRouter = Router();

usersRouter.get('/', validateToken, usersController.getUser);
usersRouter.post('/register', usersController.register);
usersRouter.post('/login', usersController.login);
usersRouter.patch('/profile', usersController.updateProfile);

export default usersRouter;
