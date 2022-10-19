import { Router } from 'express';
import { validateToken } from "../middlewares/authMiddleware.js";
import { getTimeline, getUserPosts } from "../controllers/timelineController.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", validateToken, getTimeline);
timelineRouter.get("/users/:id", getUserPosts);

export {timelineRouter};
