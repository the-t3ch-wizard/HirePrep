import { Router } from "express";
import { asyncHandler } from "../lib/utils";
import { successResponse } from "../lib/utils";
import { user } from "../controllers/user.controller";

const router = Router();

router.post("/signup", asyncHandler(user.signup))

export default router;
