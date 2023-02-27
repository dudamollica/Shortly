import { Router } from "express";
import userData from "../controller/usersController.js";
import { authValidation } from "../middleware/authMiddleware.js";

const usersRouter = Router();

usersRouter.get("/users/me", authValidation, userData);

export default usersRouter;