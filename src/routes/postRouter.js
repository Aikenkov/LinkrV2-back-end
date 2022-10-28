import { Router } from "express";
import { getSharesNumber, publishPost, sharePost } from "../controllers/postController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { publishSchema } from "../schemas/publishSchema.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";

const postRouter = Router();

postRouter.post(
    "/publish",
    validateToken,
    validateSchema(publishSchema),
    publishPost
);
postRouter.post("/share/:post_id", validateToken ,sharePost);
postRouter.get("/share/:post_id", validateToken, getSharesNumber);

export { postRouter };
