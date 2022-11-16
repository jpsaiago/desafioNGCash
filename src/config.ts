import dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;
const port = process.env.PORT;
const secret = process.env.JWT_SECRET;

export default {
  salt: saltRounds,
  port,
  secret,
};
