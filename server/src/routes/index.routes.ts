import { Router } from "express";
import { asyncHandler, successResponse } from "../lib/utils";
import { user } from "../controllers/user.controller";
import { upload } from "./upload/upload.routes";
import conversationRoutes from "./conversation/conversation.routes";
import resumeRoutes from "./resume/resume.routes";
import { authMiddleware } from "../middlewares/auth.middleware";
import userRoutes from "./user/user.routes";

const router = Router();

router.get("/health-check", asyncHandler((req: any, res: any) => {
  return res.status(200).json(successResponse(200, "Request successful", { message: "API is healthy!" }))
}))

router.post("/auth/signup", asyncHandler(user.signup))
router.post("/auth/login", asyncHandler(user.login))
router.post("/auth/logout", asyncHandler(user.logout))
router.get("/auth/who-am-i", asyncHandler(user.whoAmI))

router.use(asyncHandler(authMiddleware));

// conversation routes
// router.use("/upload", upload)

router.use("/resume", resumeRoutes)
// router.use("/chat", )
router.use("/conversation", conversationRoutes)

router.use("/user", userRoutes)

export default router;
