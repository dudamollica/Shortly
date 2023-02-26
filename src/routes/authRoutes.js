import { Router } from "express";
import validateSchema from "../middleware/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";
import { signIn, signUp} from "../controller/authController.js";

const authRouter = Router();

authRouter.post("/signin", validateSchema(signInSchema), signIn);
authRouter.post("/signup", validateSchema(signUpSchema), signUp);

export default authRouter;