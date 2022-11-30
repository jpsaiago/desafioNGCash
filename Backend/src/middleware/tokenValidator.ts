import { UnauthorizedError } from "../helpers/api-errors";
import jwt from "jsonwebtoken";
import config from "../config";
import { NextFunction, Request, Response } from "express";

export async function tokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;
  //Throw if the authorization header is missing
  if (!auth || !auth.toLowerCase().startsWith("bearer ")) {
    next(new UnauthorizedError("Token missing or invalid."));
  }
  //Get the actual string from the header
  const token = `${auth?.substring(7)}`;
  try {
    //Type manipulation needed to tell Typescript I know what kind of return I expect from this call
    const payload = jwt.verify(token, config.secret) as unknown as TokenPayload;
    //Check for the id property to avoid invalid token payloads
    if (!payload.userId || !payload.username) {
      next(new UnauthorizedError("Token missing or invalid."));
    }
    req.context = { username: payload.username };
    next();
  } catch (error) {
    next(new UnauthorizedError("Token missing or invalid."));
  }
}
