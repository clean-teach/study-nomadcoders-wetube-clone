import express from 'express'
import { watch, getEdit, postEdit, remove, upload } from '../controllers/videoControllers';

const videoRouter = express.Router();

videoRouter.get('/:id(\\d+)', watch);
videoRouter.get('/:id(\\d+)/edit', getEdit);
videoRouter.post('/:id(\\d+)/edit', postEdit);
// videoRouter.get('/:id(\\d+)/delete', remove);
// videoRouter.get('/upload', upload);

export default videoRouter;