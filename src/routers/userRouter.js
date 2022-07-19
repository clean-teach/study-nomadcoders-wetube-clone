import express from 'express'
import { see, edit, logout, startGithubLogin, finishGithubLogin } from '../controllers/userControllers';

const userRouter = express.Router();

userRouter.get('/logout', logout);
userRouter.get('/edit', edit);
userRouter.get('/github/start', startGithubLogin);
userRouter.get('/github/finish', finishGithubLogin);
userRouter.get('/:id', see);

export default userRouter;