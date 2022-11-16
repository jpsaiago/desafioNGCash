import { prisma } from "../database/prismaClient";
import { user } from "../types/user";
import bcrypt from "bcrypt";
import config from "../config";

export async function registerUserService(reqBody: user) {
  return await prisma.user.create({
    data: {
      username: reqBody.username,
      password: await bcrypt.hash(reqBody.password, config.salt),
      account: {
        create: { balance: 100 },
      },
    },
  });
}
