import { Req, Res } from "./../types/types";
import { logger } from "../lib/logger"
import { continueChatUsingGemini, errorResponse, successResponse } from "../lib/utils"
import { Conversation } from "../models/conversation.model";
import { Chat } from "../models/chat.model";
import { Resume } from "../models/resume.model";
import mongoose from "mongoose";

const getAllConversationForSideBar = async (req: Req, res: Res) => {
  // fetches basic conversation data for sidebar
  logger.info("Get all conversation")

  const userId = req.user?.userId;

  if (!userId) return res.status(401).json(errorResponse(401, "Unable to get userId"));

  const pipeline = [
    {
      "$match": {
        userId: new mongoose.Types.ObjectId(userId),
        isDeleted: false,
      },
    },
    {
      "$project": {
        _id: 0,
        title: "$name",
        url: { $concat: ["/c/", { $toString: "$_id" }] }
      }
    },
  ];

  const allConversation = await Conversation.aggregate(pipeline);

  return res.status(200).json(successResponse(200, "Fetched all conversations success", allConversation));
}

const getConversationsChatById = async (req: Req, res: Res) => {
  // fetches whole chat of conversation using id
  logger.info("Get conversation by Id")

  const { conversationId } = req.params;

  const completeConversation = await Conversation.findById(conversationId).populate('chats')

  return res.status(200).json(successResponse(200, "Fetched conversation by Id successfully!", completeConversation));
}

const createConversation = async (req: Req, res: Res) => {
  // this will be just to create initial conversation and chat in database
  // by taking uploaded resume id along with user id
  logger.info("Create conversation")

  const {
    resumeId,
    userId
  } = req.body;

  const resumeContent = await Resume.findById(resumeId);

  const initialChatByUser = await Chat.create({
    sender: "user",
    text: "Here is the content of my resume, \n" + resumeContent?.content + "."
  })

  const initialReplyByAi = await Chat.create({
    sender: "model",
    text: "Got your resume.\n How can I help you?\n Should I help you by providing a list of topics that you should prepare?\n Or Is there any particular topic that you want to prepare?"
  })

  const newConversation = await Conversation.create({
    resumeId,
    userId,
    chats: [
      initialChatByUser?._id,
      initialReplyByAi?._id,
    ],
    lastChatId: initialReplyByAi?._id,
  })

  let responseConversation = {
    _id: newConversation._id,
    chats: [
      initialChatByUser,
      initialReplyByAi
    ],
  }

  return res.status(200).json(successResponse(200, "Conversation created successfully", responseConversation));
}

const continueConversation = async (req: Req, res: Res) => {
  // used to continue conversation based on previous history
  // and new message provided
  logger.info("Continue conversation");

  const { conversationId } = req.params;
  const { history, message } = req.body; 

  let replyFromAi;

  try {
    replyFromAi = await continueChatUsingGemini(history, message);
  } catch (error) {
    console.log(error);
    return res.status(500).json(errorResponse(500, "Failed to continue conversation!"));
  }
  const newUserChat = await Chat.create({
    sender: "user",
    text: message,
  });

  const newModelChat = await Chat.create({
    sender: "model",
    text: replyFromAi,
  });

  const updatedConversation = await Conversation.updateOne({
    _id: conversationId
  }, {
    $push: {
      chats: {
        $each: [newUserChat._id, newModelChat._id]
      }
    },
  })

  return res.status(200).json(successResponse(200, "Started conversation successfully!", replyFromAi));
}

const renameConversationNameById = async (req: Req, res: Res) => {
  // renames the name of conversation using id
  logger.info("Rename conversation name by id");

  const { conversationId } = req.params;

  const { name } = req.body;

  const updatedConversation = await Conversation.updateOne({
    _id: conversationId
  }, {
    name
  })

  return res.status(200).json(successResponse(200, "Renamed conversation name successfully!", updatedConversation));
}

const deleteConversationById = async (req: Req, res: Res) => {
  // sets isDeleted true of conversation using id
  logger.info("Rename conversation name by id");

  const { conversationId } = req.params;

  const deletedConversation = await Conversation.updateOne({
    _id: conversationId
  }, {
    isDeleted: true,
  })

  return res.status(200).json(successResponse(200, "Deleted conversation successfully!", deletedConversation));
}

const updateJobDetails = async (req: Req, res: Res) => {
  // add jobTitle and jobDescription in conversation 
  logger.info("Update job details in conversation");

  const { conversationId, jobTitle, jobDescription } = req.body;

  const updatedConversation = await Conversation.updateOne({
    _id: conversationId
  }, {
    jobTitle,
    jobDescription,
  })

  return res.status(200).json(successResponse(200, "Added job details successfully!", updatedConversation))

}

const getConversationDetails = async (req: Req, res: Res) => {
  // fetches conversation details using conversation id
  // used for about conversation page
  logger.info("Get conversation details");

  const { conversationId } = req.params;

  const conversationDetails = await Conversation.findOne({
    _id: conversationId,
    isDeleted: false,
  })
  .select('resumeId name jobTitle jobDescription createdAt updatedAt')
  .populate('resumeId', 'resumeUrl')

  return res.status(200).json(successResponse(200, "Fetched conversation details successfully!", conversationDetails))

}

export const conversation = {
  getAllConversationForSideBar,
  getConversationsChatById,
  createConversation,
  continueConversation,
  renameConversationNameById,
  deleteConversationById,
  updateJobDetails,
  getConversationDetails,
}