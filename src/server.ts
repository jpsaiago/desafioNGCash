import express from "express";
import http from "http";
import config from "./config";
import cors from "cors";
const server = express();

function startServer() {
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(cors());

  //Healthcheck route
  server.get("/ping", (req, res) => res.status(200).send("Pong"));

  http
    .createServer(server)
    .listen(config.port, () =>
      console.log(`Server running on port ${config.port}.`)
    );
}
