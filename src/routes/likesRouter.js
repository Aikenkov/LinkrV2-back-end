import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import {
    getPostLikes,
    insertLike,
    removeLike,
} from "../controllers/likesController.js";

const likesRouter = Router();

likesRouter.get("/likes/:post_id", getPostLikes);
likesRouter.post("/likes/:post_id", validateToken, insertLike);
likesRouter.delete("/likes/:post_id", validateToken, removeLike);

export { likesRouter };
