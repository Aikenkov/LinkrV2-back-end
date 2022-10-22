import { Router } from 'express';
import { authRouter } from './authRoutes.js';
import { hashtagsRouter } from './hashtagsRouter.js';
import { timelineRouter } from './timelineRouter.js';
import { userRouter } from './userRoutes.js';
import { postRouter } from "./postRouter.js";
import { likesRouter } from "./likesRouter.js";
import { searchUsers } from './searchUsersRoutes.js';

const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(postRouter);
router.use(userRouter);
router.use(likesRouter);
router.use(hashtagsRouter);
router.use(searchUsers)

export default router;
