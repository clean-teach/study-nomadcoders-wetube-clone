import express from 'express'
import { edit, watch } from '../controllers/videoControllers';

const videoRouter = express.Router();

videoRouter.get('/watch', watch);
videoRouter.get('/edit', edit);

export default videoRouter;