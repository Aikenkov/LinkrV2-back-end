import { Router } from "express";
import { getPostComments } from "../controllers/commentsController.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const commentsRouter = Router();

commentsRouter.get("/comments/:post_id", getPostComments);

export { commentsRouter };
