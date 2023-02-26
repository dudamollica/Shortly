import { Router } from "express";
import { authValidation } from "../middleware/authMiddleware.js";
import { shortenUrl } from "../controller/urlsController.js";
import { urlSchema } from "../schemas/urlSchema.js";
import validateSchema from "../middleware/validateSchema.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), authValidation, shortenUrl);
urlsRouter.get("/urls/:id");
urlsRouter.get("/urls/open/:shortUrl");
urlsRouter.delete("/urls/:id");

export default urlsRouter;