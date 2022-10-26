import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import {
  getMetadata,
  getTimeline,
  getUserPosts,
  deletePost,
  editPost,
} from "../controllers/timelineController.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import { urlSchema } from "../schemas/urlSchema.js";
import { postTextSchema } from "../schemas/postTextSchema.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", validateToken, getTimeline);
timelineRouter.post("/metadata", validateSchema(urlSchema), getMetadata);
timelineRouter.get("/user/:id", validateToken, getUserPosts);
timelineRouter.delete("/posts/:id", validateToken, deletePost);
timelineRouter.put(
  "/posts/:id",
  validateToken,
  validateSchema(postTextSchema),
  editPost
);

export { timelineRouter };
