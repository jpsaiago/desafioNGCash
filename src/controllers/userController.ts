import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userServices";
import { Credentials } from "../types/user";
import {
  ApiError,
  BadRequestError,
  GatewayError,
  ServerError,
  TimeoutError,
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
      if (error instanceof (Prisma.PrismaClientKnownRequestError || Error)) {
        const code = error.code;
        switch (code) {
          case "P2002":
            return next(new BadRequestError("This user is already registered"));
          case "P1001":
            return next(new GatewayError("Can't reach the database"));
          case "P1008":
            return next(new TimeoutError("Operation timed out"));
          default:
            return next(new ServerError(error.message));
        }
      }
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const body = req.body as Credentials;
    try {
      const info = await service.login(body);
      res.status(200).json(info);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const code = error.code;
        switch (code) {
          case "P1001":
            return next(new GatewayError("Can't reach the database"));
          case "P1008":
            return next(new TimeoutError("Operation timed out"));
          default:
            return next(new ServerError(error.message));
        }
      }
    }
  }

  public async getBalance(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      next(new UnauthorizedError("Invalid or missing token."));
    }
    const token = `${req.headers.authorization?.substring(7)}`;
    const targetId = req.params.username;
    try {
      const balance = await service.getBalance(targetId, token);
      res.status(200).send(balance);
    } catch (error) {
      if (error instanceof ApiError) {
        next(error);
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const code = error.code;
        switch (code) {
          case "P1001":
            return next(new GatewayError("Can't reach the database"));
          case "P1008":
            return next(new TimeoutError("Operation timed out"));
          default:
            return next(new ServerError(error.message));
        }
      }
    }
  }
}
