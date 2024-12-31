import { model } from "mongoose"
import { logger } from "../lib/logger"
import { userSchema } from "../models/user.model"
import { successResponse } from "../lib/utils"

const signup = async (req : any, res : any) => {
  logger.info("USER SIGNUP")

  const {name, email, password} = req.body;

  const User = model("User", userSchema);

  const newUser = await User.create({
    name,
    email,
    password,
  })

  return res.status(200).json(successResponse(200, "User created successfully", newUser))
}

const login = async (req : any, res : any) => {

}

export const user = {
  signup,
  login,
}