import { prisma } from "../database/prismaClient";
import { user } from "../types/user";
import bcrypt from "bcrypt";
import config from "../config";

export async function registerUserService(body: user) {
  return await prisma.user.create({
    data: {
      username: body.username,
      password: await bcrypt.hash(body.password, config.salt),
      account: {
        create: { balance: 100 },
      },
    },
  });
}
