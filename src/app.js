import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());
// server.use([gamesRouter, clientsRouter, rentsRouter]);

server.listen(process.env.PORT, () => console.log("servidor funfou"));
