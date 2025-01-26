import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loggedInStatus: false,
  userDetails: {
    id: null,
    name: null,
    email: null,
  }
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
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails = initialState.userDetails;
    }
  }
})

export const { setUserLoggedInStatus, clearUserLoggedInStatus, setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;