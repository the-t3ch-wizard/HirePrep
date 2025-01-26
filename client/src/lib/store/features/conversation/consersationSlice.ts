import { createSlice } from "@reduxjs/toolkit"

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
    chats: [
      /*
      {
        sender: "user" || "model",
        text: ""
      }
      */
    ]
  }
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
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = initialState.currentConversation
    },
    setCurrentConversationChats: (state, action) => {
      state.currentConversation.chats = action.payload
    },
  }
})

export const { setNewChatUploadedResumeDetail, clearNewChatUploadedResumeDetail, setCurrentConversation, clearCurrentConversation, setCurrentConversationChats } = conversationSlice.actions;

export default conversationSlice.reducer;