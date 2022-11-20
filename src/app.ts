import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { router } from "./routes";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

//Healthcheck route
app.get("/ping", (req, res) => res.status(200).send("Pong"));
export default app;
