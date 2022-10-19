import { Router } from "express";
import { publishPost } from "../controllers/postController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { publishSchema } from "../schemas/publishSchema.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";

const postRouter = Router();

postRouter.post("/publish", validateSchema(publishSchema), publishPost);

export { postRouter };
