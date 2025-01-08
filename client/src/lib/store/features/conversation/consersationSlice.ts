import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  newChat: {
    UploadedResumeDetail: {
      publicId: '',
      imageUrl: '',
    },
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
  }
})

export const { setNewChatUploadedResumeDetail, clearNewChatUploadedResumeDetail } = conversationSlice.actions;

export default conversationSlice.reducer;