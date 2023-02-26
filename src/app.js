import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js"
import rankingRouter from "./routes/rankingRoutes.js"
import urlsRouter from "./routes/urlsRoutes.js"
import usersRouter from "./routes/usersRoutes.js"

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());
server.use([authRouter, rankingRouter, urlsRouter, usersRouter]);

server.listen(process.env.PORT, () => console.log("servidor funfou"));
