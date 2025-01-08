import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { conversation } from "../../controllers/conversation.controller";

const conversationRoutes = Router();

conversationRoutes.post("/create", asyncHandler(conversation.createConversation))

export default conversationRoutes;

