import { Router } from "express";
import { postSignUp } from "../controllers/authControllers.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import { registerSchema } from "../schemas/signupSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(registerSchema), postSignUp);

export { authRouter };
