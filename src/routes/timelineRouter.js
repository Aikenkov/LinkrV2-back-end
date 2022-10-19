import { Router } from 'express';
import { validateToken } from "../middlewares/authMiddleware.js";
import { getTimeline } from "../controllers/timelineController.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", validateToken, getTimeline);

export {timelineRouter};
