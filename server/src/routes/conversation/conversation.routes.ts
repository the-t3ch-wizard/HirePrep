import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { conversation } from "../../controllers/conversation.controller";

const conversationRoutes = Router();

conversationRoutes.get("/", asyncHandler(conversation.getAllConversationForSideBar))
conversationRoutes.get("/:conversationId", asyncHandler(conversation.getConversationsChatById))
conversationRoutes.put("/:conversationId", asyncHandler(conversation.continueConversation))
conversationRoutes.delete("/:conversationId", asyncHandler(conversation.deleteConversationById))
conversationRoutes.patch("/rename/:conversationId", asyncHandler(conversation.renameConversationNameById))
conversationRoutes.post("/create", asyncHandler(conversation.createConversation))

export default conversationRoutes;

