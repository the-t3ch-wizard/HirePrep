
export const env = {
  API_URL: String(import.meta.env.VITE_API_URL),
  CLOUDINARY_CLOUD_NAME: String(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME),
  CLOUDINARY_API_KEY: String(import.meta.env.VITE_CLOUDINARY_API_KEY),
  CLOUDINARY_API_SECRET: String(import.meta.env.VITE_CLOUDINARY_API_SECRET),
  CLOUDINARY_UPLOAD_PRESET: String(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
}
