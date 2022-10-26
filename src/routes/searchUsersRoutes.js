import { Router } from 'express';
import { getUsers, getUsersFollow } from '../controllers/searchUsersControllers.js';
import { validateToken } from '../middlewares/authMiddleware.js';



const searchUsers = Router();

searchUsers.get("/search", getUsers);
searchUsers.get("/followed", validateToken, getUsersFollow )
export{ searchUsers }