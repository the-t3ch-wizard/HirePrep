import dotenv from "dotenv"

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),
  JWTSECRETKEY: String(process.env.JWTSECRETKEY),
}
