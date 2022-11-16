import { prisma } from "../database/prismaClient";
import { user } from "../types/user";
import config from "../config";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

export async function loginUserService(body: user) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });
    if (!user) {
      throw new Error("Wrong username or password.");
    }
    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new Error("Wrong username or password.");
    }
    const tokenParams = {
      username: user.username,
      id: user.id,
    };
    //Template literal string to avoid using no null assertion
    return jwt.sign(tokenParams, `${config.secret}`, { expiresIn: "24h" });
  } catch (error) {
    return error;
  }
}
