import dotenv from "dotenv"

// FIX: path of env based on mode (development, production) and even can change based on env.local
dotenv.config({ path: '.env.local' });

export const env = {
  PORT: Number(process.env.PORT),
  JWTSECRETKEY: String(process.env.JWTSECRETKEY),
  FRONTEND_URL: String(process.env.FRONTEND_URL),
  NODE_ENV: String(process.env.NODE_ENV),
  CLOUDINARY_CLOUD_NAME: String(process.env.CLOUDINARY_CLOUD_NAME),
  CLOUDINARY_API_KEY: String(process.env.CLOUDINARY_API_KEY),
  CLOUDINARY_API_SECRET: String(process.env.CLOUDINARY_API_SECRET),
}
