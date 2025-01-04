import dotenv from "dotenv"

dotenv.config({ path: '.env.local' });

export const env = {
  PORT: Number(process.env.PORT),
  JWTSECRETKEY: String(process.env.JWTSECRETKEY),
  FRONTEND_URL: String(process.env.FRONTEND_URL),
  NODE_ENV: String(process.env.NODE_ENV),
}
