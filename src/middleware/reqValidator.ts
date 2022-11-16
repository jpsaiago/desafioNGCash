import { ZodEffects, AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

class ResponseObject {
  public path: string;
  public message: string;
  constructor(path: string, message: string) {
    this.path = path;
    this.message = message;
  }
}

export function requestValidator(
  schema: AnyZodObject | ZodEffects<AnyZodObject>
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      //Mandatory type check to avoid Typescript errors
      if (err instanceof ZodError) {
        const responseArray: ResponseObject[] = [];
        logger.error("Request body", "Invalid info.");
        err.issues.map((issue) => {
          const responseObject = new ResponseObject(
            issue.path.toString(),
            issue.message
          );
          responseArray.push(responseObject);
        });
        return res.status(400).send(responseArray);
      }
    }
  };
}
