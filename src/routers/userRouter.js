import express from 'express'
import { see, edit, remove, logout } from '../controllers/userControllers';

const userRouter = express.Router();

userRouter.get(':id', see);
userRouter.get('/edit', edit);
userRouter.get('/remove', remove);
userRouter.get('/logout', logout);

export default userRouter;