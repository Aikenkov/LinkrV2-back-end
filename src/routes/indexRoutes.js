import { Router } from "express";
import { authRouter } from "./authRoutes.js";
import { timelineRouter } from "./timelineRouter.js";
import { userRouter } from "./userRoutes.js";
import { postRouter } from "./postRouter.js";

const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(postRouter);
router.use(userRouter);

export default router;
