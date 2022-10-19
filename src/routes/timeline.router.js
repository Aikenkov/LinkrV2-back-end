import express from "express";

import { validateToken } from "../middlewares/auth.middleware.js";
import { getTimeline } from "../controllers/timeline.controller.js";

const router = express.Router();

router.get("/timeline", validateToken, getTimeline);

export default router;
