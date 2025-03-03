import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { user } from "../../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/details", asyncHandler(user.getUserDetails))

userRoutes.get("/check-platform-profile-validity", asyncHandler(user.checkPlatformProfileValidity))
userRoutes.put("/platform-profile/:code", asyncHandler(user.updatePlatformProfileDetailForUser))

userRoutes.put("/basic-info", asyncHandler(user.updateBasicInfoForUser))
userRoutes.put("/socials", asyncHandler(user.updateSocialsForUser))
userRoutes.put("/profile-visibility", asyncHandler(user.updateProfileVisibilityForUser))
userRoutes.patch("/password", asyncHandler(user.updatePasswordForUser))

export default userRoutes;
