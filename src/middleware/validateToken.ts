import { TokenPayload } from "../types/user";
import { UnauthorizedError } from "../utils/api-errors";
import jwt from "jsonwebtoken";
import config from "../config";

export async function validateToken(token: string) {
  if (!token) {
    throw new UnauthorizedError("Token missing or invalid.");
  }

  //Type manipulation needed to tell Typescript I know what kind of return I expect from this call
  const payload = <TokenPayload>(<unknown>jwt.verify(
    token,
    config.secret,
    (err, decoded) => {
      if (err) {
        throw new UnauthorizedError("Token missing or invalid.");
      }
      if (decoded) {
        return decoded;
      }
    }
  ));
  //Check for the id property to avoid invalid token payloads
  if (!payload.id) {
    throw new UnauthorizedError("Token missing or invalid.");
  }
  return payload;
}
