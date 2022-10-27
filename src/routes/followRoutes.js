import { Router } from 'express'
import { postFollow, deleteFollow, isFollowing } from '../controllers/followControllers.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const userFollow = Router();

userFollow.post('/follow', validateToken, postFollow);
userFollow.delete('/follow', validateToken, deleteFollow)
userFollow.get('/follow/:id', validateToken, isFollowing)
export { userFollow }