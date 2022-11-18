import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userServices";
import { Credentials, LoggedUser } from "../types/user";
import {
  BadRequestError,
  ServerError,
  UnauthorizedError,
} from "../utils/api-errors";

const service = new UserService();

export class UserController {
  public async register(req: Request, res: Response, next: NextFunction) {
    const body = req.body as Credentials;
    try {
      const username = await service.register(body);
      res.status(201).send(`User ${username} registered successfully!`);
    } catch (error) {
      //Mandatory typecheck to avoid typescript errors
      if (error instanceof (Prisma.PrismaClientKnownRequestError || Error)) {
        const code = error.code;
        if (code == "P2002") {
          return next(new BadRequestError(`This user is already registered`));
        }
        return next(new ServerError(error.message));
      }
    }
  }

  public async login(req: Request, res: Response) {
    const body = req.body as Credentials;
    const info = await service.login(body);
    if (info) {
      res.status(200).json(info);
    }
  }

  public async getBalance(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      next(new UnauthorizedError("Invalid or missing token."));
    }
    const token = req.headers.authorization?.split("")[1];
    const targetId = req.params.userId;
  }
}
