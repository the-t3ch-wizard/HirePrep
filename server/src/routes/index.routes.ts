import { Router } from "express";
import { asyncHandler } from "../lib/utils";
import { user } from "../controllers/user.controller";

const router = Router();

router.post("/auth/signup", asyncHandler(user.signup))
router.post("/auth/login", asyncHandler(user.login))
router.put("/auth/logout", asyncHandler(user.logout))
router.get("/auth/who-am-i", asyncHandler(user.whoAmI))

export default router;
