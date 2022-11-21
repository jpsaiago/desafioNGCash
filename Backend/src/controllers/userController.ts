import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userServices";
import {
  BadRequestError,
  GatewayError,
  ServerError,
  TimeoutError,
} from "../helpers/api-errors";

const service = new UserService();

export class UserController {
  private handleErrors(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          return new BadRequestError("This user is already registered.");
        case "P1001":
          return new GatewayError("Can't reach the database.");
        case "P1008":
          return new TimeoutError("Operation timed out.");
        default:
          return new ServerError();
      }
    }
    return error;
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    try {
      const username = await service.register(body);
      res.status(201).send(`User ${username} registered successfully!`);
    } catch (error) {
      next(this.handleErrors(error));
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    try {
      const info = await service.login(body);
      res.status(200).json(info);
    } catch (error) {
      next(this.handleErrors(error));
    }
  }

  public async getInfo(req: Request, res: Response, next: NextFunction) {
    try {
      //Use the user id present in the token payload to grab info
      const user = `${req.context?.userId}`;
      const account = await service.getInfo(user);
      res.status(200).json(account);
    } catch (error) {
      next(this.handleErrors(error));
    }
  }
}
