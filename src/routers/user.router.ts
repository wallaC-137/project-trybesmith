import { Router } from 'express';
import LoginController from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/', LoginController.login);

export default userRouter;