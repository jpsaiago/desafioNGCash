import express from "express";
import { TransactionController } from "./controllers/transactionController";
import { UserController } from "./controllers/userController";
import { inputValidator } from "./middleware/inputValidator";
import { tokenValidator } from "./middleware/tokenValidator";
import { logger } from "./utils/logger";
import {
  loginSchema,
  registrationSchema,
  transactionRequestSchema,
} from "./schemas/validation";
import { errorHandler } from "./middleware/errorHandler";

const user = new UserController();
const transactions = new TransactionController();

export const router = express.Router();
router.use(logger.request);

router.get("/ping", (req, res) => res.status(200).send("Pong"));

router.post("/users", inputValidator(registrationSchema), (req, res, next) =>
  user.signup(req, res, next)
);

router.post("/login", inputValidator(loginSchema), (req, res, next) =>
  user.login(req, res, next)
);

//Protects every route after this with a token validator

router.get("/users", tokenValidator, (req, res, next) =>
  user.getInfo(req, res, next)
);

router.post(
  "/transactions",
  inputValidator(transactionRequestSchema),
  tokenValidator,
  (req, res, next) => {
    transactions.create(req, res, next);
  }
);

router.use(errorHandler);
