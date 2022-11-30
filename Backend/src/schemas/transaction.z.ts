import z from "zod";

const transactionRequestSchema = z
  .object({
    target: z.string(),
    value: z.string(),
  })
  .superRefine(({ value }, ctx) => {
    if (!Number(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["value"],
        message: "Please provide a numerical value",
      });
    }
  });

export { transactionRequestSchema };
