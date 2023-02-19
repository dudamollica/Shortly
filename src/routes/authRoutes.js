import { Router } from "express";
import validateSchema from "../middleware/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/signin", validateSchema(signInSchema));
authRouter.post("/signup", validateSchema(signUpSchema));

export default authRouter;