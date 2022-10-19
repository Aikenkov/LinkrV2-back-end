import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/indexRoutes.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(router);

server.get("/status", (req, res) => {
  res.send("Ok status");
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
