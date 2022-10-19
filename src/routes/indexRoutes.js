import { Router } from 'express';
import { authRouter } from './authRoutes.js';
import { timelineRouter } from './timelineRouter.js';

const router = Router();

router.use(authRouter);
router.use(timelineRouter);

export default router;