import z from "zod";

const registrationSchema = z
  .object({
    username: z
      .string()
      .min(
        3,
        "This username is too short, it should be at least 3 characters long"
      ),
    password: z
      .string()
      .min(
        8,
        "This password is too short, it should be at least 8 characters long"
      ),
  })
  .superRefine(({ password }, ctx) => {
    const expressions = {
      number: /\d/,
      caps: /[A-Z]/,
      lower: /[a-z]/,
    };
    if (
      !(
        expressions.number.test(password) &&
        expressions.caps.test(password) &&
        expressions.lower.test(password)
      )
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message:
          "Your password should contain at least one lower case letter, one upper case letter and one number.",
      });
  });

export { registrationSchema };
