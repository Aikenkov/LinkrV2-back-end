import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import timelineRouter from "./routes/timeline.router.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.get("/status", (req, res) => {
  res.send("Ok status");
});

server.use(timelineRouter);

server.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
