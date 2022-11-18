import { prisma } from "../prisma/prismaClient";
import { Credentials } from "../types/user";
import config from "../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";

export class UserService {
  public async register(body: Credentials) {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: await bcrypt.hash(body.password, config.salt),
        account: {
          create: { balance: 100 },
        },
      },
    });
    return user.username;
  }

  public async login(body: Credentials) {
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
      const info = {
        token: jwt.sign({ user: user.username, id: user.id }, config.secret, {
          expiresIn: config.jwtDuration,
        }),
        username: user.username,
        userId: user.id,
        accountId: user.accountId,
      };
      return info;
    } catch (error) {
      return error;
    }
  }
}
