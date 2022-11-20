import { prisma } from "../prisma/prismaClient";
import config from "../config";
import bcrypt from "bcrypt";
import { ForbiddenError, UnauthorizedError } from "../helpers/api-errors";

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
    //The same
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new UnauthorizedError("Wrong username or password.");
    }
    // const token = await new jose.SignJWT({ userId: user.id })
    //   .setIssuedAt()
    //   .setExpirationTime("24h")
    //   .sign(config.secret);
    // return {
    //   token: await new jose.SignJWT({ userId: user.id })
    //     .setExpirationTime("24h")
    //     .sign(config.secret)({ userId: user.id }, config.secret, {
    //     expiresIn: config.jwtDuration,
    //   }),
    //   username: user.username,
    //   userId: user.id,
    //   accountId: user.accountId,
    // };
  }

  public async getBalance(target: string, payload: string) {
    const authUser = await prisma.user.findUniqueOrThrow({
      where: { username: target },
      select: {
        id: true,
        accountId: true,
      },
    });
    if (!(payload === authUser.id)) {
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
