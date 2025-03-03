import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../config/env";
import { convertFileUrlToBase64 } from "../utils";

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

export const continueChatUsingGemini = async (history: Array<Content>, message: string) => {

  const genAI = new GoogleGenerativeAI(env.GOOGLE_GENAI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    // model: "gemini-1.5-flash",
    // model: "gemini-1.5-flash-8b",
    model: "gemini-2.0-flash-lite-preview-02-05",
    systemInstruction: "You are a highly knowledgeable and professional assistant specializing in job interview preparation. Your role is to provide personalized and relevant content based on the user’s input, including resume optimization, tailored responses for specific job positions, and industry-specific interview preparation tips. Always offer practical advice, clear explanations, and resources to help users succeed in their interviews. Be concise, yet detailed, and ensure that all content aligns with professional standards and the requirements of the job role described by the user. NOTE: Provide answer in a structured format and do not add unnecessary spacing and gap between lines in your reply."
  });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    // maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const chatSession = model.startChat({
    generationConfig,
    history: history.map((msg) => ({
      role: msg.role,
      parts: msg.parts
    }))
  });

  const replyFromAi = await chatSession.sendMessage(message);

  return replyFromAi.response.text();

}
