import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userServices";
import { Credentials, LoggedUser } from "../types/user";
import { UnauthorizedError } from "../utils/api-errors";

const service = new UserService();

export class UserController {
  public async register(req: Request, res: Response, next: NextFunction) {
    const body = req.body as Credentials;
    const response = service.register(body);
    res.status(201).send(`User ${body.username} registered successfully!`);
  }

  public async login(req: Request, res: Response) {
    const body = req.body as Credentials;
    try {
      const info = (await service.login(body)) as LoggedUser;
      res.status(200).send(info);
    } catch (error) {
      res.status(500).send();
    }
  }

  public async getBalance(req: Request, res: Response) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      throw new UnauthorizedError("Invalid or missing token.");
    }
    const token = req.headers.authorization?.split("")[1];
    const targetId = req.params.userId;
  }
}
