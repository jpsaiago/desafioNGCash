import express from "express";
import { TransactionController } from "./controllers/transactionController";
import { UserController } from "./controllers/userController";
import { inputValidator } from "./middleware/inputValidator";
import { tokenValidator } from "./middleware/tokenValidator";
import { logger } from "./utils/logger";
import { validation } from "./schemas/validation";

const user = new UserController();
const transactions = new TransactionController();

export const router = express.Router();
router.use(logger.request);

router.get("/ping", (req, res) => res.status(200).send("Pong"));

router.post(
  "/users",
  inputValidator(validation.registration),
  (req, res, next) => user.register(req, res, next)
);

router.post("/login", inputValidator(validation.login), (req, res, next) =>
  user.login(req, res, next)
);

//Protects every route after this with a token validator
router.use(tokenValidator);

router.get("/users", (req, res, next) => user.getInfo(req, res, next));

router.post(
  "/transactions",
  inputValidator(validation.transactionReq),
  (req, res, next) => {
    transactions.create(req, res, next);
  }
);
