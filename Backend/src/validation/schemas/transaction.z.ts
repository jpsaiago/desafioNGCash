import z from "zod";

const transactionSchema = z.object({
  target: z.string(),
  value: z.string(),
});

export { transactionSchema };
