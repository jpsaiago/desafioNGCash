import { ZodEffects, AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../helpers/api-errors";

export function inputValidator(
  schema: AnyZodObject | ZodEffects<AnyZodObject>
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      //Mandatory type check to avoid Typescript errors
      if (err instanceof ZodError) {
        const errorArray: string[] = [];
        err.issues.map((issue) => {
          errorArray.push(`${issue.path}: ${issue.message}`);
        });
        return next(new BadRequestError(errorArray.toString()));
      }
    }
  };
}
