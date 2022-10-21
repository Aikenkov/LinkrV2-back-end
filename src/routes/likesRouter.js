import { validateToken } from "../middlewares/authMiddleware";
import {
    getPostLikes,
    insertLike,
    removeLike,
} from "../controllers/likesController";

const likesRouter = Router();

likesRouter.get("/likes", getPostLikes);
likesRouter.post("/likes", validateToken, insertLike);
likesRouter.delete("/likes", validateToken, removeLike);

export { likesRouter };
