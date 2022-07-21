import express from 'express'
import { see, logout, startGithubLogin, finishGithubLogin, getEdit, postEdit, getChangePassword, postChangePassword } from '../controllers/userControllers';
import { avatarUpload, protectorMiddleware, publicOnlyMiddleware } from '../middlewares';

const userRouter = express.Router();

userRouter.get('/logout',protectorMiddleware , logout);
userRouter.get('/github/start',publicOnlyMiddleware , startGithubLogin);
userRouter.get('/github/finish',publicOnlyMiddleware, finishGithubLogin);
userRouter.route('/edit').all(protectorMiddleware).get(getEdit).post(avatarUpload.single('avatar'), postEdit);
userRouter.route('/change-password').all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get('/:id', see);

export default userRouter;