import { loginSchema } from "./login.z";
import { registrationSchema } from "./registration.z";
import { transactionRequestSchema } from "./transaction.z";

export const validation = {
  registration: registrationSchema,
  login: loginSchema,
  transactionReq: transactionRequestSchema,
};
