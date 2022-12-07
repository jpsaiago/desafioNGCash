import { Prisma } from "@prisma/client";
import {
  NotFoundError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  GatewayError,
  ServerError,
  TimeoutError,
} from "../helpers/api-errors";
import { TransactionService } from "../services/transactionService";

const service = new TransactionService();

export class TransactionController {
  private handleErrors(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P1001":
          return new GatewayError("Can't reach the database");
        case "P1008":
          return new TimeoutError("Operation timed out");
        case "P2001":
          return new BadRequestError("User not found");
        default:
          return new ServerError();
      }
    }
    if (error instanceof NotFoundError) {
      return new BadRequestError("Target user not found.");
    }
    return error;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const body = req.body as TransactionRequest;
    try {
      const results = await service.create(
        `${req.context?.username}`,
        body.target,
        Number(body.value)
      );
      res.status(200).json(results);
    } catch (error) {
      next(this.handleErrors(error));
    }
  }
}
