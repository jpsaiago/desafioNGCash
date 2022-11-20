import dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;
const port = process.env.PORT;
const secret = process.env.JWT_SECRET;
const jwtDuration = process.env.TOKEN_DURATION;
const algorithm = process.env.ALGORITHM;

export default {
  salt: saltRounds,
  port,
  secret: `${secret}`,
  jwtDuration,
};
