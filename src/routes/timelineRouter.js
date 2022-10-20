import { Router } from 'express';
import { validateToken } from "../middlewares/authMiddleware.js";
import { getTimeline, getUserPosts } from "../controllers/timelineController.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", validateToken, getTimeline);
timelineRouter.get("/user/:id", getUserPosts);

export {timelineRouter};
