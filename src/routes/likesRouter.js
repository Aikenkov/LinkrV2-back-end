import { validateToken } from "../middlewares/authMiddleware";
import {
    getPostLikes,
    insertLike,
    removeLike,
} from "../controllers/likesController";

const likesRouter = Router();

likesRouter.get("/likes/:post_id", getPostLikes);
likesRouter.post("/likes/:post_id", validateToken, insertLike);
likesRouter.delete("/likes/:post_id", validateToken, removeLike);

export { likesRouter };
