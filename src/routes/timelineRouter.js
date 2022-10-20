import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import {
  getMetadata,
  getTimeline,
  getUserPosts,
} from "../controllers/timelineController.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import { urlSchema } from "../schemas/urlSchema.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", validateToken, getTimeline);
timelineRouter.post("/metadata", validateSchema(urlSchema), getMetadata);
timelineRouter.get("/user/:id", getUserPosts);

export { timelineRouter };
