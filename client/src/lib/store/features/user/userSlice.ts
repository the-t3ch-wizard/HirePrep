import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loggedInStatus: false,
  userDetails: {
    _id: undefined,
    name: undefined,
    email: undefined,
    profileName: undefined,
    imageUrl: undefined,
    bio: undefined,
    gender: undefined,
    birthDate: undefined,
    country: undefined,
    userEducationalDetails: {
      college: undefined,
      degree: undefined,
    },
    socialMediaProfileList: {
      linkedinUrl: undefined,
      twitterUrl: undefined,
      websiteUrl: undefined,
      mailUrl: undefined,
      resumeUrl: undefined,
    },
    profileVisibilityConfig: {
      profileVisibility: undefined,
    },
    platformProfiles: [],
  },
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
      state.userDetails = {
        ...state.userDetails,
        ...action.payload,
      };
    },
    clearUserDetails: (state) => {
      state.userDetails = initialState.userDetails;
    }
  }
})

export const { setUserLoggedInStatus, clearUserLoggedInStatus, setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;