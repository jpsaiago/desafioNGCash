import { logger } from "./utils/logger";
import { prisma } from "./prisma/prismaClient";
import config from "./config";
import app from "./app";
import jose from "jose";

prisma.$connect().then(start).catch(errorHandler);

function start() {
  logger.info("Connected to database");
  app.listen(config.port, () =>
    logger.info(`Server running on port ${config.port}.`)
  );
}

function errorHandler() {
  logger.error(
    "Database",
    "Unable to connect to database, please verify your settings and restart the app."
  );
}
