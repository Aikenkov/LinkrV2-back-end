import { Router } from 'express';
import { authRouter } from './authRoutes.js';
import { hashtagsRouter } from './hashtagsRouter.js';
import { timelineRouter } from './timelineRouter.js';
import { userRouter } from './userRoutes.js';

const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(userRouter);
router.use(hashtagsRouter);

export default router;