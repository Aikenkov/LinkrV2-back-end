import { Router } from "express";
import {
    getPostsByHashtag,
    getHashtagsTrending,
} from "../controllers/hashtagsController.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const hashtagsRouter = Router();
hashtagsRouter.get("/trending", validateToken, getHashtagsTrending);
hashtagsRouter.get("/hashtag/:hashtag", validateToken, getPostsByHashtag);

export { hashtagsRouter };
