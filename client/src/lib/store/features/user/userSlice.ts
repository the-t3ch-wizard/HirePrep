import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loggedInStatus: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoggedInStatus: (state, action) => {
      state.loggedInStatus = action.payload
    },
    clearUserLoggedInStatus: (state) => {
      state.loggedInStatus = false
    },
  }
})

export const { setUserLoggedInStatus, clearUserLoggedInStatus } = userSlice.actions;

export default userSlice.reducer;