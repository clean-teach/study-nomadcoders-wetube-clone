import express from 'express'
import { edit, remove, watch, upload } from '../controllers/videoControllers';

const videoRouter = express.Router();

videoRouter.get('/upload', upload);
videoRouter.get('/:id(\\d+)', watch);
videoRouter.get('/:id(\\d+)/edit', edit);
videoRouter.get('/:id(\\d+)/delete', remove);

export default videoRouter;