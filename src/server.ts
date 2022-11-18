import { logger } from "./utils/logger";
import config from "./config";
import app from "./app";

app.listen(config.port, () =>
  logger.info(`Server running on port ${config.port}.`)
);
