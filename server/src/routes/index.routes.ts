import { Router } from "express";
import { asyncHandler } from "../lib/utils";
import { successResponse } from "../lib/utils";
import { user } from "../controllers/user.controller";

const router = Router();

router.post("/signup", asyncHandler(user.signup))
router.post("/login", asyncHandler(user.login))
router.put("/logout", asyncHandler(user.logout))
router.get("/who-am-i", asyncHandler(user.whoAmI))

export default router;
