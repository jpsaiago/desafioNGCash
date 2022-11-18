import { ZodEffects, AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { BadRequestError } from "../utils/api-errors";

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
        const errorMessage = "";
        logger.error("Request body", "Invalid info.");
        err.issues.map((issue) => {
          errorMessage + ", " + `${issue.path.toString()} is a required field`;
        });
        return next(new BadRequestError(errorMessage));
      }
    }
  };
}
