import { Request, Response } from "express";
import { logger } from "../lib/logger"
import { errorResponse, successResponse } from "../lib/utils"

const createConversation = async (req : Request, res : Response) => {
  
  // create resume based on resumeUrl
  // then analyze that resume using ai and store its content in resume's content

  // if the user permit that content then use this function
  // to start the conversation based on that as a context prompt

  // start conversation



}

export const conversation = {
  createConversation,
}