import { Req, Res } from "./../types/types";
import { logger } from "../lib/logger";
import { v2 as cloudinary } from 'cloudinary';
import { env } from "../config/env";

const uploadImage = async (req: Req, res: Res) => {
  logger.info("Upload image")

  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
  });
  

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
      public_id: 'shoes',
    }
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  // const optimizeUrl = cloudinary.url('shoes', {
  //   fetch_format: 'auto',
  //   quality: 'auto'
  // });

  // console.log(optimizeUrl);

  // // Transform the image: auto-crop to square aspect_ratio
  // const autoCropUrl = cloudinary.url('shoes', {
  //   crop: 'auto',
  //   gravity: 'auto',
  //   width: 500,
  //   height: 500,
  // });

  // console.log(autoCropUrl);

  // return res
}

const getImage = async (req: Req, res: Res) => {

}

export const upload = {
  uploadImage,
  getImage,
}