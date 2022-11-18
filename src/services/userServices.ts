import { prisma } from "../prisma/prismaClient";
import { Credentials } from "../types/user";
import config from "../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError } from "../utils/api-errors";
import { validateToken } from "../middleware/validateToken";

export class UserService {
  public async register(input: Credentials) {
    const user = await prisma.user.create({
      data: {
        username: input.username,
        password: await bcrypt.hash(input.password, config.salt),
        account: {
          create: { balance: 100 },
        },
      },
    });
    return user.username;
  }

  public async login(input: Credentials) {
    const user = await prisma.user.findUnique({
      where: {
        username: input.username,
      },
    });
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new UnauthorizedError("Wrong username or password.");
    }
    return {
      token: jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtDuration,
      }),
      username: user.username,
      userId: user.id,
      accountId: user.accountId,
    };
  }

  public async getBalance(target: string, token: string) {
    //The validateToken middleware does the repetitive validation heavy lifting
    const payload = await validateToken(token);
    const authUser = await prisma.user.findUniqueOrThrow({
      where: { username: target },
      select: {
        id: true,
        accountId: true,
      },
    });
    if (!(payload.id === authUser.id)) {
      throw new ForbiddenError("Invalid access attempt.");
    }
    const account = await prisma.account.findUniqueOrThrow({
      where: {
        id: authUser.accountId,
      },
      select: {
        balance: true,
      },
    });
    return account;
  }
}
