import { Router } from "express";
import { authRouter } from "./authRoutes.js";
import { postRouter } from "./postRouter.js";
import { timelineRouter } from "./timelineRouter.js";

const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(postRouter);

export default router;
