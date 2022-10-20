import express from 'express';
import { getUserById } from '../controllers/usersController.js';

const userRouter = express.Router();

userRouter.get("/users/:id", getUserById);

export { userRouter };