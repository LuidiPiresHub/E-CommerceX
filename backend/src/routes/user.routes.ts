import { Router } from 'express';
import usersController from '../controller/user.controller';
import validateToken from '../middlewares/validadeToken';
import { upload } from '../config/multer';
import { validadeUserLogin, validadeUserRegister, validateUserUpdate } from '../middlewares/validadeUser';

const usersRouter = Router();

usersRouter.get('/', validateToken, usersController.getUser);
usersRouter.post('/register', validadeUserRegister, usersController.register);
usersRouter.post('/login', validadeUserLogin, usersController.login);
usersRouter.post('/logout', validateToken, usersController.logout);
usersRouter.put('/:id', validateToken, upload.single('profileImg'), validateUserUpdate, usersController.updateUser);

export default usersRouter;
