import express from 'express';
import { getPostsByUserId } from '../controllers/usersController.js';

const userRouter = express.Router();

userRouter.get("/users/:id", getPostsByUserId);

export default userRouter;