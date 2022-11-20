import { prisma } from "../prisma/prismaClient";
import { ForbiddenError, UnauthorizedError } from "../helpers/api-errors";
import config from "../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    //Searches the database for the received user
    const user = await prisma.user.findUnique({
      where: {
        username: input.username,
      },
    });
    //Throws if user is not found
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new UnauthorizedError("Wrong username or password.");
    }
    const token = jwt.sign({ userId: user.id }, config.secret, {
      expiresIn: "24h",
    });
    return {
      token: token,
      username: user.username,
      userId: user.id,
      accountId: user.accountId,
    };
  }

  public async getInfo(targetUser: string, payload: string) {
    const authUser = await prisma.user.findUniqueOrThrow({
      where: { username: targetUser },
      select: {
        id: true,
        account: {
          select: {
            balance: true,
            creditedTransactions: true,
            debitedTransactions: true,
          },
        },
      },
    });
    const { id, ...userInfo } = authUser;
    if (id !== payload) {
      throw new ForbiddenError("Invalid access attempt.");
    }
    return userInfo;
  }
}
