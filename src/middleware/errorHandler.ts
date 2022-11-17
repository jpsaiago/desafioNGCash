import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-errors";

export async function errorHandler(
  error: Error & ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ApiError) {
    const statusCode = error.statusCode;
    const message = error.message;
    return res.status(statusCode).json({ message });
  }
  const statusCode = 500;
  const message = "Internal Server Error";
  return res.status(statusCode).json({ message });
}
