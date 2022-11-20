import { loginSchema } from "./schemas/login.z";
import { registrationSchema } from "./schemas/registration.z";

export const validation = {
  registration: registrationSchema,
  login: loginSchema,
};
