import { Router } from "express";
import {
    getPostComments,
    insertComment,
} from "../controllers/commentsController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import { postCommentSchema } from "../schemas/postCommentSchema.js";

const commentsRouter = Router();

commentsRouter.get("/comments/:post_id", getPostComments);

commentsRouter.post(
    "/comments",
    validateToken,
    validateSchema(postCommentSchema),
    insertComment
);

export { commentsRouter };
