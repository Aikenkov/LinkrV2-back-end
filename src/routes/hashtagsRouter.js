import { Router } from 'express';
import { getPostsByHashtag, getHashtagsTrending } from '../controllers/hashtagsController.js';

const hashtagsRouter = Router();
hashtagsRouter.get("/trending", getHashtagsTrending);
hashtagsRouter.get("/hashtag/:hashtag", getPostsByHashtag);

export {hashtagsRouter}