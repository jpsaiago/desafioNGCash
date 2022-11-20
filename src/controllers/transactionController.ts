import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userServices";
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
          return new BadRequestError(error.message);
        default:
          return new ServerError();
      }
    }
    return error;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const body = req.body as Transaction;
    try {
      const results = await service.create(
        body.sender,
        body.receiver,
        body.value,
        `${req.context?.userId}`
      );
      res.status(200).json(results[2]);
    } catch (error) {
      next(this.handleErrors(error));
    }
  }
}
