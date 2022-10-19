import express from "express";

import { validateToken } from "../middlewares/auth.middleware";
import { getTimeline } from "../controllers/timeline.controller";

const router = express.Router();

router.get("/timeline", validateToken, getTimeline);

export default router;
