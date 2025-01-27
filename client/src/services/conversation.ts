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
