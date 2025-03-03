import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { user } from "../../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/details", asyncHandler(user.getUserDetails))

userRoutes.get("/check-platform-profile-validity", asyncHandler(user.checkPlatformProfileValidity))
userRoutes.get("/platform-profiles", asyncHandler(user.getPlatformProfilesOfUser))
userRoutes.put("/platform-profile/:code", asyncHandler(user.updatePlatformProfileDetailForUser))

userRoutes.put("/basic-info", asyncHandler(user.updateBasicInfoForUser))
userRoutes.put("/socials", asyncHandler(user.updateSocialsForUser))
userRoutes.put("/profile-visibility", asyncHandler(user.updateProfileVisibilityForUser))
userRoutes.patch("/password", asyncHandler(user.updatePasswordForUser))

userRoutes.get("/check-profile-name-validity/:profileName", asyncHandler(user.checkProfileNameValidity))
userRoutes.patch("/profile-name/:profileName", asyncHandler(user.updateProfileName))

export default userRoutes;
