import dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;
const port = process.env.PORT;

export default {
  salt: saltRounds,
  port: port,
};
