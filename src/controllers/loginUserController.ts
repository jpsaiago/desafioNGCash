import { Request, Response } from "express";
import { loginUserService } from "../services/loginUserService";
import { user } from "../types/user";

export async function loginController(req: Request, res: Response) {
  const body = req.body as user;
  try {
    const token = await loginUserService(body);
    res.status(201).send({ token, user: body.username });
  } catch (error) {
    res.status(400).send();
  }
}
