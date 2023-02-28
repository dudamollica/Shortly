import { Router } from "express";
import {userData, ranking} from "../controller/usersController.js";
import { authValidation } from "../middleware/authMiddleware.js";

const usersRouter = Router();

usersRouter.get("/users/me", authValidation, userData);
usersRouter.get("/ranking", ranking);

export default usersRouter;