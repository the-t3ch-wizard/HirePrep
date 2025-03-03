import { Req, Res } from "./../types/types";
import { logger } from "../lib/logger"
import { errorResponse, successResponse } from "../lib/utils"
import { Resume } from "../models/resume.model";
import { extractResumeContentUsingGemini } from "../lib/api/gemini";

const extractAndCreateResume = async (req: Req, res: Res) => {
  logger.info("Extract and create resume")

  const { resumeUrl } = req.body;

  if (!resumeUrl) return res.status(400).json(errorResponse(400, "Unable to get resume url"))

  const extractedContent = await extractResumeContentUsingGemini(resumeUrl);

  const createdResume = await Resume.create({
    resumeUrl,
    content: extractedContent,
  })

  return res.status(200).json(successResponse(200, "Resume created successfully", createdResume))
}

export const resume = {
  extractAndCreateResume,
}