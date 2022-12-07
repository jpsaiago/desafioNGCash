import dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;
const port = 8080;
const secret =
  "96713246tgyiasg897791890]][3[143p[123-'401-24p=dqp=.,m,.k23/542k,l;i34.utyfvbuitfvbuiTYBUFKTBUITRFbiutfivturiUTRFV875vf[p[123p[4[pá[sD1IL0P[234KU90M8-/*/*-vf8v7t6BFIUTFjycvrteDUYTVfciuyGBRDI7bu6trdfiu765ERB87t6f";
const jwtExpiration = "24h";

export default {
  salt: saltRounds,
  port: port,
  secret: `${secret}`,
  jwtExpiration: jwtExpiration,
};
