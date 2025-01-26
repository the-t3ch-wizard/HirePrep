import axios from "axios";
import { logger } from "./logger";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";

export const asyncHandler = (fn: any) => async (req: any, res: any, next: any) => {
  try {
    await fn(req, res, next);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(errorResponse(500, error.message || "An error occurred"));
  }
};

export const successResponse = (statusCode: number, message = "Req successful", data: any) => {
  logger.info(`RESPONSE: ${statusCode} ${message}`);
  // logger.success(`RESPONSE: ${statusCode} ${message}`);
  return {
    statusCode,
    success: true,
    message,
    data,
  };
};

export const errorResponse = (statusCode: number, message = "An error occurred", errors = []) => {
  logger.error(`ERROR: ${statusCode} ${message}`);
  return {
    statusCode,
    success: false,
    message,
    errors,
  };
};

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  // Optionally send error to an external monitoring service
  // e.g., logErrorToMonitoringService(err);

  res.status(500).json(errorResponse(500, "Internal Server Error"));
};

export const convertFileUrlToBase64 = async (fileUrl: string) => {
  const response = await axios.get(fileUrl, { responseType: 'arraybuffer' }); // Fetch the file as an array buffer
  const base64 = Buffer.from(response.data).toString('base64'); // Convert to Base64
  return base64;
}

export const extractResumeContentUsingGemini = async (resumeUrl: string) => {
  
  const base64 = await convertFileUrlToBase64(resumeUrl);
    
  const filePart = {
    inlineData: {
      data: base64,
      mimeType: "image/jpeg",
    },
  };
  
  const genAI = new GoogleGenerativeAI(env.GOOGLE_GENAI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are a resume content generator, who extracts the content of a resume into text. All information in the resume must be provided."
  });

  const prompt = "Extract the content of the provided resume";
  
  const result = await model.generateContent([
    prompt,
    filePart
  ]);

  const extractedContent = result.response.text();
  
  return extractedContent;
}

export const continueChatUsingGemini = async (history: [], message: string) => {

  const genAI = new GoogleGenerativeAI(env.GOOGLE_GENAI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are a highly knowledgeable and professional assistant specializing in job interview preparation. Your role is to provide personalized and relevant content based on the user’s input, including resume optimization, tailored responses for specific job positions, and industry-specific interview preparation tips. Always offer practical advice, clear explanations, and resources to help users succeed in their interviews. Be concise, yet detailed, and ensure that all content aligns with professional standards and the requirements of the job role described by the user."
   });

  const chat = model.startChat({
    history: history
  });

  let replyFromAi = await chat.sendMessage(message);

  return replyFromAi.response.text();

}
