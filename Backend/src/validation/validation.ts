import { loginSchema } from "./schemas/login.z";
import { registrationSchema } from "./schemas/registration.z";
import { transactionSchema } from "./schemas/transaction.z";

export const validation = {
  registration: registrationSchema,
  login: loginSchema,
  transaction: transactionSchema,
};
