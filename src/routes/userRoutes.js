import express from 'express';
import { getUserById } from '../controllers/usersController.js';
import { validateToken } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/users/:id", validateToken, getUserById);

export { userRouter };