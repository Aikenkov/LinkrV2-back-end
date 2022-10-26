import { Router } from "express";
import { authRouter } from "./authRoutes.js";
import { hashtagsRouter } from "./hashtagsRouter.js";
import { timelineRouter } from "./timelineRouter.js";
import { userRouter } from "./userRoutes.js";
import { postRouter } from "./postRouter.js";
import { likesRouter } from "./likesRouter.js";
import { searchUsers } from "./searchUsersRoutes.js";
import { commentsRouter } from "./commentsRouter.js";
import { userFollow } from "./followRoutes.js";

const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(postRouter);
router.use(userRouter);
router.use(likesRouter);
router.use(hashtagsRouter);
router.use(searchUsers);
router.use(commentsRouter);
router.use(userFollow)

export default router;
