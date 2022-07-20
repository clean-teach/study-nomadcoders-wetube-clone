import express from 'express'
import { see, logout, startGithubLogin, finishGithubLogin, getEdit, postEdit } from '../controllers/userControllers';

const userRouter = express.Router();

userRouter.get('/logout', logout);
userRouter.get('/github/start', startGithubLogin);
userRouter.get('/github/finish', finishGithubLogin);
userRouter.route('/edit').get(getEdit).post(postEdit);
userRouter.get('/:id', see);

export default userRouter;