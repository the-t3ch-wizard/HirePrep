import { getAllConversationForSideBar } from "@/services/conversation"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  newChat: {
    UploadedResumeDetail: {
      publicId: '',
      imageUrl: '',
    },
  },
  currentConversation: {
    id: '',
    name: '',
    resumeId: '',
    resumeUrl: '',
    jobTitle: '',
    jobDescription: '',
    // aiFeedbackSummay: {
    //   strengths: '',
    //   areasToImprove: '',
    //   suggestedResources: '',
    // },
    chats: [
      /*
      {
        sender: "user" || "model",
        text: ""
      }
      */
    ],
    createdAt: '',
    updatedAt: '',
  },
  conversationList: [
    {
      title: '',
      url: '',
    }
  ]
}

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setNewChatUploadedResumeDetail: (state, action) => {
      state.newChat.UploadedResumeDetail = action.payload
    },
    clearNewChatUploadedResumeDetail: (state) => {
      state.newChat.UploadedResumeDetail = initialState.newChat.UploadedResumeDetail
    },
    setCurrentConversationId: (state, action) => {
      state.currentConversation.id = action.payload
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = initialState.currentConversation
    },
    setCurrentConversationChats: (state, action) => {
      state.currentConversation.chats = action.payload
    },
    setConversationList: (state, action) => {
      state.conversationList = action.payload
    },
  }
})

export const { setNewChatUploadedResumeDetail, clearNewChatUploadedResumeDetail, setCurrentConversation, clearCurrentConversation, setCurrentConversationChats, setCurrentConversationId, setConversationList } = conversationSlice.actions;

export default conversationSlice.reducer;

export const getAndSetConversationListForSideBar = createAsyncThunk(
  "conversation/getConversationListForSideBar",
  async (_, { dispatch }) => {
    try {
      const conversations = await getAllConversationForSideBar();
      dispatch(setConversationList(conversations.data))
    } catch (error) {
      console.log(error);
    }
  }
)