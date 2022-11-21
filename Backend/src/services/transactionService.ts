import { prisma } from "../prisma/prismaClient";
import { BadRequestError, ForbiddenError } from "../helpers/api-errors";

export class TransactionService {
  public async create(sender: string, recipient: string, value: number) {
    if (sender == recipient) {
      throw new BadRequestError("Invalid transaction recipient");
    }
    const dbSender = await prisma.user.findUniqueOrThrow({
      where: { username: sender },
      select: {
        id: true,
        account: true,
      },
    });
    //Could create a data racing condition
    if (value > dbSender.account.balance) {
      throw new ForbiddenError("Insufficient account funds.");
    }
    const dbRecipient = await prisma.user.findUniqueOrThrow({
      where: { username: recipient },
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
      where: { id: dbRecipient.account.id },
      data: { balance: { increment: value } },
    });

    const newTransaction = prisma.transaction.create({
      data: {
        value: value,
        debitedId: dbSender.account.id,
        creditedId: dbRecipient.account.id,
      },
    });
    //Execute the operations in order, roll back everything if any one of them fails
    const results = await prisma.$transaction([subtract, add, newTransaction]);
    return results;
  }
}
