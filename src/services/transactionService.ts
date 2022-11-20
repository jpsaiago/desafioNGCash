import { prisma } from "../prisma/prismaClient";
import { ForbiddenError } from "../helpers/api-errors";

export class TransactionService {
  public async create(
    sender: string,
    receiver: string,
    value: number,
    payload: string
  ) {
    const dbSender = await prisma.user.findUniqueOrThrow({
      where: { username: sender },
      select: {
        id: true,
        account: true,
      },
    });
    //Check if the operation is allowed
    if (dbSender.id !== payload) {
      throw new ForbiddenError("Invalid access attempt.");
    }
    if (value > dbSender.account.balance) {
      throw new ForbiddenError("Insufficient account funds.");
    }
    const dbReceiver = await prisma.user.findUniqueOrThrow({
      where: { username: receiver },
      select: {
        id: true,
        account: true,
      },
    });
    //Create operations as promises
    const subtract = prisma.account.update({
      where: { id: dbSender.account.id },
      data: { balance: { decrement: value } },
    });

    const add = prisma.account.update({
      where: { id: dbReceiver.account.id },
      data: { balance: { increment: value } },
    });

    const newTransaction = prisma.transaction.create({
      data: {
        value: value,
        debitedId: dbSender.account.id,
        creditedId: dbReceiver.account.id,
      },
    });
    //Execute the operations in order, roll back everything if any one of them fails
    const results = await prisma.$transaction([subtract, add, newTransaction]);
    return results;
  }
}
