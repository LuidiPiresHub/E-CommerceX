import { Router } from 'express';
import usersController from '../controller/user.controller';
import validateToken from '../middlewares/validadeToken';
import { upload } from '../config/multer';

const usersRouter = Router();

usersRouter.get('/', validateToken, usersController.getUser);
usersRouter.post('/register', usersController.register);
usersRouter.post('/login', usersController.login);
usersRouter.post('/logout', validateToken, usersController.logout);
usersRouter.put('/:id', validateToken, upload.single('profileImg'), usersController.updateUser);

export default usersRouter;
