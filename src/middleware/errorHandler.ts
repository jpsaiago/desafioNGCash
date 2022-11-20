import { NextFunction, Request, Response } from "express";
import { ApiError, ServerError } from "../helpers/api-errors";
import { logger } from "../utils/logger";

export async function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ApiError) {
    logger.error(error.statusCode.toString(), error.message);
    return res.status(error.statusCode).json({ issues: error.message });
  }
  const response = new ServerError();
  return res.status(response.statusCode).json({ message: response.message });
}
