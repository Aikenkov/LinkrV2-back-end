import { Router } from 'express';
import { getHashtagsTrending } from '../controllers/hashtagsController.js';

const hashtagsRouter = Router();
hashtagsRouter.get("/trending", getHashtagsTrending);

export {hashtagsRouter}