import { UnauthorizedError } from "../helpers/api-errors";
import jose from "jose";
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
  //Type manipulation needed to tell Typescript I know what kind of return I expect from this call

  //Check for the id property to avoid invalid token payloads
  // if (payload.userId) {
  //   next(new UnauthorizedError("Token missing or invalid."));
  // }
  // req.context = { userId: payload.userId };
  // next();
}
