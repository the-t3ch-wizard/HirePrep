import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { upload as uploadController } from "../../controllers/upload.controller"

export const upload = Router()

upload.post("/image", asyncHandler(uploadController.uploadImage))
upload.get("/image/:id", asyncHandler(uploadController.getImage))
