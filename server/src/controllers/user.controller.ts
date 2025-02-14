import { model } from "mongoose"
import jwt from "jsonwebtoken";
import { logger } from "../lib/logger"
import { userSchema } from "../models/user.model"
import { errorResponse, successResponse } from "../lib/utils"
import { env } from "../config/env";
import { Req, Res } from "./../types/types";
import bcrypt from "bcrypt";
import {User} from "../models/user.model"

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
    domain: '.vercel.app',
    path: "/",
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
    domain: '.vercel.app',
    path: "/",
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
    domain: '.vercel.app',
    path: "/",
  })
  // had to set options for token as per mode of server

  return res.status(200).json(successResponse(200, "User logged out successfully", null))
}

export const user = {
  signup,
  login,
  whoAmI,
  logout,
}