import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { conversation } from "../../controllers/conversation.controller";

const conversationRoutes = Router();

conversationRoutes.get("/", asyncHandler(conversation.getAllConversationForSideBar))

conversationRoutes.patch("/rename/:conversationId", asyncHandler(conversation.renameConversationNameById))
conversationRoutes.delete("/:conversationId", asyncHandler(conversation.deleteConversationById))

conversationRoutes.put("/job-details", asyncHandler(conversation.updateJobDetails))
conversationRoutes.get("/details/:conversationId", asyncHandler(conversation.getConversationDetails))

conversationRoutes.post("/create", asyncHandler(conversation.createConversation))

conversationRoutes.get("/:conversationId", asyncHandler(conversation.getConversationsChatById))

conversationRoutes.put("/:conversationId", asyncHandler(conversation.continueConversation))

export default conversationRoutes;

