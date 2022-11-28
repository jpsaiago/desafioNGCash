import cors from "cors";
import express from "express";
import config from "./config";
import { errorHandler } from "./middleware/errorHandler";
import { prisma } from "./prisma/prismaClient";
import { router } from "./routes";
import { logger } from "./utils/logger";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

prisma.$connect().then(start).catch(connectionError);

app.use(errorHandler);
function start() {
  logger.info("Connected to database");
  app.listen(config.port, () =>
    logger.info(`Server running on port ${config.port}.`)
  );
}

function connectionError() {
  logger.error(
    "Database",
    "Unable to connect to database, please verify your settings and restart the app."
  );
}
