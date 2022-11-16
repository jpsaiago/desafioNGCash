import express from "express";
import { loginController } from "./controllers/loginUserController";
import { registerController } from "./controllers/registerUserController";
import { requestValidator } from "./middleware/reqValidator";
import { logger } from "./utils/logger";
import { validation } from "./validation/validation";

export const router = express.Router();
router.use(logger.request);

//Healthcheck route
router.get("/ping", (req, res) => res.status(200).send("Pong"));

router.post(
  "/register",
  requestValidator(validation.registration),
  registerController
);

router.post("/login", requestValidator(validation.login), loginController);
