import { Router } from 'express';
import { getUsers } from '../controllers/searchUsersControllers.js';



const searchUsers = Router();

searchUsers.get("/search", getUsers);

export{ searchUsers }