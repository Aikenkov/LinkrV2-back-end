import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import { getMetadata, getTimeline } from "../controllers/timelineController.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import { urlSchema } from "../schemas/urlSchema.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", validateToken, getTimeline);
timelineRouter.post("/metadata", validateSchema(urlSchema), getMetadata);

export { timelineRouter };
