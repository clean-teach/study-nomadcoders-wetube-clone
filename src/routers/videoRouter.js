import express from 'express'
import { edit, remove, see, upload } from '../controllers/videoControllers';

const videoRouter = express.Router();

videoRouter.get('/upload', upload);
videoRouter.get('/:id(\\d+)', see);
videoRouter.get('/:id(\\d+)/edit', edit);
videoRouter.get('/:id(\\d+)/delete', remove);

export default videoRouter;