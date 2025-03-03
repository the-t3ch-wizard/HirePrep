import { model } from "mongoose"
import jwt from "jsonwebtoken";
import { logger } from "../lib/logger"
import { userSchema } from "../models/user.model"
import { errorResponse, successResponse } from "../lib/utils"
import { env } from "../config/env";
import { Req, Res } from "./../types/types";
import bcrypt from "bcrypt";
import {User} from "../models/user.model"
import { checkLeetcodeProfileValidity, getLeetcodeProfileDetail } from "../lib/api/leetcode";
import { platformData } from "../lib/constants";

const signup = async (req : Req, res : Res) => {
  logger.info("Signup user")

  const {name, email, password} = req.body;

  // 
  const existingUser = await User.findOne({
    email
  })
  if (existingUser) return res.status(409).json(errorResponse(409, "User with same email already exists"));

  //
  const newUser = await User.create({
    name,
    email,
    password,
  })

  //
  const token = jwt.sign({
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  }, env.JWTSECRETKEY, {
    expiresIn: "7d"
  })
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
  // had to set options for token as per mode of server

  return res.status(200).json(successResponse(200, "User signed up successfully", {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  }))
}

const login = async (req : Req, res : Res) => {
  logger.info("Login user")

  const {email, password} = req.body;  

  // 
  let userFound = await User.findOne({
    email,
  })
  if (!userFound){
    return res.status(400).json(errorResponse(400, "User not found"))
  }

  // 
  const passwordMatched = await bcrypt.compare(password, userFound.password);
  if (!passwordMatched){
    return res.status(401).json(errorResponse(401, "Wrong password"))
  }

  // 
  const token = jwt.sign({
    id: userFound._id,
    name: userFound.name,
    email: userFound.email,
  }, env.JWTSECRETKEY, {
    expiresIn: "7d"
  })
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
  // had to set options for token as per mode of server

  return res.status(200).json(successResponse(200, "User logged in successfully", {
    id: userFound._id,
    name: userFound.name,
    email: userFound.email,
  }))
}

const whoAmI = async (req : Req, res: Res) => {
  logger.info("Who am i")

  const {authToken} = req.cookies;

  if (!authToken){
    return res.status(401).json(errorResponse(401, "No token provided"))
  }

  // 
  const decoded : any = jwt.verify(authToken, env.JWTSECRETKEY)
  if (!decoded){
    return res.status(401).json(errorResponse(401, "Invalid token"))
  }
  
  // 
  const existingUser = await User.findOne({
    _id: decoded?.id
  })
  if (!existingUser){
    return res.status(401).json(errorResponse(401, "Invalid token: User not found"))
  }

  return res.status(200).json(successResponse(200, "User details fetched successfully", {
    id: decoded?.id,
    name: decoded?.name,
    email: decoded?.email,
  }))
}

const logout = async (req : Req, res : Res) => {
  logger.info("Logout user")

  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
  // had to set options for token as per mode of server

  return res.status(200).json(successResponse(200, "User logged out successfully", null))
}

const getUserDetails = async (req: Req, res: Res) => {
  logger.info("Get user details")

  const userId = req.user?.userId;

  console.log(userId);

  const userDetail = await User.findById(userId).select('-password')

  if (!userDetail){
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.status(404).json(errorResponse(404, "Unable to find the user"))
  }

  return res.status(200).json(successResponse(200, "User details fetched successfully", userDetail))
}

const checkPlatformProfileValidity = async (req: Req, res: Res) => {
  logger.info("Check platform profile validity")

  const userId = req.user?.userId;

  const {username, platformCode} = req.query;

  let validity;

  switch (Number(platformCode)){
    case 0:
      validity = await checkLeetcodeProfileValidity(String(username));

      break;

    default:
      return res.status(400).json(errorResponse(400, "Platform code provided is invalid"))
  }

  return res.status(200).json(successResponse(200, "Checked platform profile validity successfully", {
    validity
  }))
}

const updatePlatformProfileDetailForUser = async (req: Req, res: Res) => {
  logger.info("Update platform profile detail for user")

  const userId = req.user?.userId;

  const {
    code
  } = req.params;
  const platformCode = Number.parseInt(code);

  const {
    username,
  } = req.body;

  if (typeof(platformCode) == undefined || !username) return res.status(400).json(errorResponse(400, "Platform code and username are required"))

  const platformDetail = platformData.at(platformCode);

  let platformProfileDetail;

  switch (platformCode){
    case 0:
      if (!(await checkLeetcodeProfileValidity(username))) return res.status(400).json(errorResponse(400, "Platform username provided is invalid"))
      platformProfileDetail = await getLeetcodeProfileDetail(username)

      break;

    default:
      return res.status(400).json(errorResponse(400, "Platform code provided is invalid"))
  }

  let updatedUserDetail = await User.updateOne({
    _id: userId,
    "platformProfiles.platformCode": platformCode
  }, {
    $set: {
      "platformProfiles.$": platformProfileDetail
    }
  })

  if (updatedUserDetail && updatedUserDetail?.matchedCount === 0) {
    updatedUserDetail = await User.updateOne(
      { _id: userId },
      { $push: { platformProfiles: platformProfileDetail } }
    );
  }

  return res.status(200).json(successResponse(200, "Updated platform profile detail for user successfully", {username: platformProfileDetail.userStats.username}))
}

const getAndRefreshPlatformProfileDetailForUser = async (req: Req, res: Res) => {
  logger.info("Get and refresh platform profile detail for user")

  const userId = req.user?.userId;

  let platformProfileDetail;

  // had to get username of all platfroms from user db
  // call refresh api inorder to get basic changeing data from platform apis

  return res.status(200).json(successResponse(200, "Updated platform profile detail for user successfully", platformProfileDetail))
}

export const updateBasicInfoForUser = async (req: Req, res: Res) => {
  logger.info("Update basic info for user")

  const userId = req.user?.userId;
  const { name, bio, gender, birthDate, country, college, degree } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      name,
      bio,
      gender,
      birthDate,
      country,
      userEducationalDetails: { college, degree },
    },
    { new: true }
  ).select('name bio gender birthDate country userEducationalDetails')

  if (!updatedUser) return res.status(404).json(errorResponse(404, "User not found"));
  return res.status(200).json(successResponse(200, "Updated basic info successfully", updatedUser));
};

export const updateSocialsForUser = async (req: Req, res: Res) => {
  logger.info("Update socials for user")

  const userId = req.user?.userId;
  const { linkedin, twitter, website, mail, resume } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      "socialMediaProfileList.linkedinUrl": linkedin,
      "socialMediaProfileList.twitterUrl": twitter,
      "socialMediaProfileList.websiteUrl": website,
      "socialMediaProfileList.mailUrl": mail,
      "socialMediaProfileList.resumeUrl": resume,
    },
    { new: true }
  ).select('socialMediaProfileList')

  if (!updatedUser) return res.status(404).json(errorResponse(404, "User not found"));
  return res.status(200).json(successResponse(200, "Updated social media profiles successfully", updatedUser));
};

export const updateProfileVisibilityForUser = async (req: Req, res: Res) => {
  logger.info("Update profile visibility for user")

  const userId = req.user?.userId;
  const { profileVisibility } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      "profileVisibilityConfig.profileVisibility": Number.parseInt(profileVisibility),
    },
    { new: true }
  ).select('profileVisibilityConfig')

  if (!updatedUser) return res.status(404).json(errorResponse(404, "User not found"));
  return res.status(200).json(successResponse(200, "Updated profile visibility successfully", updatedUser));
};

export const updatePasswordForUser = async (req: Req, res: Res) => {
  logger.info("Update password for user")

  const userId = req.user?.userId;
  const { oldPassword, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json(errorResponse(400, "Passwords do not match"));
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json(errorResponse(404, "User not found"));

  if (oldPassword && password) {
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json(errorResponse(400, "Incorrect old password"));

    user.password = password;
  }

  await user.save();

  return res.status(200).json(successResponse(200, "Updated account information successfully", null));
};

// export const updatePlatformProfilesForUser = async (req: Req, res: Res) => {
//   const userId = req.user?.userId;
//   const { leetcode, geeksforgeeks } = req.body;
//   const updatedUser = await User.findByIdAndUpdate(
//     userId,
//     {
//       platformProfiles: [
//         { platformCode: 0, platform: "leetcode", "userStats.username": leetcode },
//         { platformCode: 1, platform: "geeksforgeeks", "userStats.username": geeksforgeeks },
//       ],
//     },
//     { new: true }
//   );
//   if (!updatedUser) return res.status(404).json(errorResponse(404, "User not found"));
//   return res.status(200).json(successResponse(200, "Updated platform profiles successfully", updatedUser));
// };

export const user = {
  signup,
  login,
  whoAmI,
  logout,
  getUserDetails,
  
  checkPlatformProfileValidity,
  updatePlatformProfileDetailForUser,

  updateBasicInfoForUser,
  updateSocialsForUser,
  updateProfileVisibilityForUser,
  updatePasswordForUser,
}