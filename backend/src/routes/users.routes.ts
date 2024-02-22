import { Router } from 'express';
import usersController from '../controller/users.controller';

const usersRouter = Router();

usersRouter.post('/register', usersController.register);

export default usersRouter;
