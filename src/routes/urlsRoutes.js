import { Router } from "express";
import { authValidation } from "../middleware/authMiddleware.js";
import { shortenUrl, getUrl } from "../controller/urlsController.js";
import { urlSchema } from "../schemas/urlSchema.js";
import validateSchema from "../middleware/validateSchema.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", authValidation, validateSchema(urlSchema), shortenUrl);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl");
urlsRouter.delete("/urls/:id");

export default urlsRouter;