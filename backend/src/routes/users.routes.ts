import { Router } from 'express';
import usersController from '../controller/users.controller';

const usersRouter = Router();

usersRouter.post('/register', usersController.register);
usersRouter.post('/login', usersController.login);

export default usersRouter;
