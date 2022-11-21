import z from "zod";

const transactionRequestSchema = z.object({
  target: z.string(),
  value: z.string(),
});

export { transactionRequestSchema };
