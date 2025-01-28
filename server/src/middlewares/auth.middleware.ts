import { Next, Req, Res } from "./../types/types";
import { errorResponse } from "../lib/utils";
import { env } from "../config/env";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Req, res: Res, next: Next) => {

  const {authToken} = req.cookies;
  if (!authToken){
    return res.status(401).json(errorResponse(401, "No token provided"))
  }

  const decoded : any = jwt.verify(authToken, env.JWTSECRETKEY)
  if (!decoded){
    return res.status(401).json(errorResponse(401, "Invalid token"))
  }

  req.user = {
    userId: decoded.id,
    name: decoded.name,
    email: decoded.email
  }
  
  next();

}
