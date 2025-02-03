import { axiosInstance } from "@/lib/api/axiosInstance"
import API_ENDPOINTS from "@/lib/api/endPoints"

export const getAllConversationForSideBar = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_CONVERSATION)
  return response.data;
}

export const getConversationsChatById = async (payload: {
  conversationId: string;
}) => {
  const response = await axiosInstance.get(API_ENDPOINTS.GET_CONVERSATION_BY_ID + payload.conversationId)
  return response.data;
}

export const createConversation = async (payload: any) => {
  const response = await axiosInstance.post(API_ENDPOINTS.CREATE_CONVERSATION, payload)
  return response.data;
}

export const continueConversation = async (payload: {
  conversationId: string;
  history: { role: any; parts: { text: any; }[]}[];
  message: string;
}) => {
  const response = await axiosInstance.put(API_ENDPOINTS.CONTINUE_CONVERSATION + payload.conversationId, payload, {
    timeout: 90000,
  })
  return response.data;
}

export const updateJobDetails = async (payload: { conversationId: string; jobTitle: string; jobDescription: string }) => {
  const response = await axiosInstance.put(API_ENDPOINTS.UPDATE_JOB_DETAILS, payload)
  return response.data;
}

export const getConversationDetails = async (payload: {
  conversationId: string;
}) => {
  const response = await axiosInstance.get(API_ENDPOINTS.GET_CONVERSATION_DETAILS + payload.conversationId)
  return response.data;
}

export const renameConversationNameById = async (payload: {
  conversationId: string;
  name: string;
}) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.RENAME_CONVERSATION_TITLE + payload.conversationId, {
    name: payload.name
  });
  return response.data;
}

export const deleteConversationById = async (payload: {
  conversationId: string;
}) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_CONVERSATION + payload.conversationId);
  return response.data;
}