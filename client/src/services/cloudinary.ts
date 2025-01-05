import { env } from "@/config/env";
import axios from "axios";

export const uploadImage = async (payload: any) => {
  const response = await axios.post(`https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`, payload)
  return response;
}