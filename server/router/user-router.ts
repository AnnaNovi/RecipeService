import express from 'express';
import { UserController } from '../controllers/user-controller';
import { body } from 'express-validator';

export const userRouter = express.Router();

userRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 32 }),
  UserController.registration
);
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);
userRouter.get('/refresh', UserController.refresh);
userRouter.get('/users', UserController.getUsers);
