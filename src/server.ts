import { prisma } from "./database/prismaClient";
import { router } from "./routes";
import { logger } from "./utils/logger";
import config from "./config";
import express from "express";
import http from "http";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";

const server = express();
prisma
  .$connect()
  .then(startServer)
  .catch(() => logger.error("Database", "Unable to connect."));

function startServer() {
  logger.info("Connected to Database.");
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(cors());
  server.use(router);
  server.use(errorHandler);

  http
    .createServer(server)
    .listen(config.port, () =>
      logger.info(`Server running on port ${config.port}.`)
    );
}
