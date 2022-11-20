import express from "express";
import { UserController } from "./controllers/userController";
import { inputValidator } from "./middleware/inputValidator";
import { tokenValidator } from "./middleware/tokenValidator";
import { logger } from "./utils/logger";
import { validation } from "./validation/validation";

const user = new UserController();

export const router = express.Router();
router.use(logger.request);

router.post(
  "/users",
  inputValidator(validation.registration),
  (req, res, next) => user.register(req, res, next)
);

router.post("/login", inputValidator(validation.login), (req, res, next) =>
  user.login(req, res, next)
);

router.get("/users/:username", tokenValidator, (req, res, next) =>
  user.getBalance(req, res, next)
);
