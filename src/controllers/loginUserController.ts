import { Request, Response } from "express";
import { registerUserService } from "../services/registerUserService";
import { user } from "../types/user";

export async function loginController(req: Request, res: Response) {
  const body = req.body as user;
  try {
    await registerUserService(body);
    res.status(201).send(`User ${body.username} registered successfully!`);
  } catch (error) {
    res.status(400).send();
  }
}
