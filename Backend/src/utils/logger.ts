import { NextFunction, Request, Response } from "express";

function info(message: string) {
  console.log(`[${new Date().toISOString()}] [INFO] ${message}`);
}

function error(code: string, message: string) {
  console.log(`[${new Date().toISOString()}] [ERROR] ${code}: ${message}`);
}

const request = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toISOString()}] [${req.method}] ${req.originalUrl} from ${
      req.ip
    }`
  );
  next();
};

export const logger = {
  info,
  error,
  request,
};
