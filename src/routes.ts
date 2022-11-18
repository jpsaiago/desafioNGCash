import express from "express";
import { UserController } from "./controllers/userController";
import { requestValidator } from "./middleware/reqValidator";
import { logger } from "./utils/logger";
import { validation } from "./validation/validation";

const user = new UserController();

export const router = express.Router();
router.use(logger.request);

//Healthcheck route
router.get("/ping", (req, res) => res.status(200).send("Pong"));

router.post("/users", requestValidator(validation.registration), user.register);

router.post("/login", requestValidator(validation.login), user.login);

router.get("users/:userId", user.getBalance);
