import { Router } from "express";
import { asyncHandler } from "../lib/utils";
import { user } from "../controllers/user.controller";
import { upload } from "./upload/upload.routes";
import conversationRoutes from "./conversation/conversation.routes";
import resumeRoutes from "./resume/resume.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/auth/signup", asyncHandler(user.signup))
router.post("/auth/login", asyncHandler(user.login))
router.put("/auth/logout", asyncHandler(user.logout))
router.get("/auth/who-am-i", asyncHandler(user.whoAmI))

router.use(asyncHandler(authMiddleware));

// conversation routes
// router.use("/upload", upload)

router.use("/resume", resumeRoutes)
// router.use("/chat", )
router.use("/conversation", conversationRoutes)

export default router;
