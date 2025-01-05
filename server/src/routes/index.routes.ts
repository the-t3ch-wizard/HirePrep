import { Router } from "express";
import { asyncHandler } from "../lib/utils";
import { user } from "../controllers/user.controller";
import { upload } from "./upload/upload.routes";

const router = Router();

router.post("/auth/signup", asyncHandler(user.signup))
router.post("/auth/login", asyncHandler(user.login))
router.put("/auth/logout", asyncHandler(user.logout))
router.get("/auth/who-am-i", asyncHandler(user.whoAmI))

// conversation routes
router.use("/upload", upload)

router.use("/resume", )
router.use("/chat", )
router.use("/conversation", )

export default router;
