import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import { UnauthorizedError } from "../helpers/api-errors";
import { prisma } from "../prisma/prismaClient";

export class UserService {
  public async signup(input: Credentials) {
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
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.secret,
      {
        expiresIn: "24h",
      }
    );
    return {
      username: user.username,
      token,
      exp: new Date().getTime() + 1000 * 60 * 60 * 24, //24 hours from now, the same as the token expiration date
    };
  }

  public async getInfo(targetUser: string) {
    //Select the info needed on the front end
    const userInfo = await prisma.user.findUniqueOrThrow({
      where: { id: targetUser },
      select: {
        account: {
          select: {
            balance: true,
            creditedTransactions: {
              select: {
                createdAt: true,
                value: true,
                debitedAccount: {
                  select: {
                    user: {
                      select: {
                        username: true,
                      },
                    },
                  },
                },
                creditedAccount: {
                  select: {
                    user: {
                      select: {
                        username: true,
                      },
                    },
                  },
                },
              },
            },
            debitedTransactions: {
              select: {
                createdAt: true,
                value: true,
                debitedAccount: {
                  select: {
                    user: {
                      select: {
                        username: true,
                      },
                    },
                  },
                },
                creditedAccount: {
                  select: {
                    user: {
                      select: {
                        username: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    //Create a array os typed Transactions and populate it with info from the db
    const transactions: Transaction[] = [];
    //Add a custom "type" property to transactions, to filter them on the front end
    userInfo.account.creditedTransactions.map((trsc) =>
      transactions.push({
        type: "credit",
        value: trsc.value,
        createdAt: trsc.createdAt,
        from: trsc.debitedAccount.user?.username || "",
        to: trsc.creditedAccount.user?.username || "",
      })
    );
    userInfo.account.debitedTransactions.map((trsc) =>
      transactions.push({
        type: "debit",
        value: trsc.value,
        createdAt: trsc.createdAt,
        from: trsc.debitedAccount.user?.username || "",
        to: trsc.creditedAccount.user?.username || "",
      })
    );

    return {
      balance: userInfo.account.balance,
      transactions: transactions,
    };
  }
}
