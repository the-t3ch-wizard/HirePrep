
const API_ENDPOINTS = {
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  WHO_AM_I: "/auth/who-am-i",

  USER_DETAILS: "/user/details",

  USER_BASIC_INFO: "/user/basic-info",
  USER_SOCIALS: "/user/socials",
  USER_PROFILE_VISIBILITY: "/user/profile-visibility",
  USER_PASSWORD: "/user/password",
  USER_PLATFORM_PROFILE: "/user/platform-profile",
  
  EXTRACT_AND_CREATE_RESUME: "/resume/extract-and-create",

  GET_ALL_CONVERSATION: "/conversation",
  GET_CONVERSATION_BY_ID: "/conversation/",
  CREATE_CONVERSATION: "/conversation/create",
  CONTINUE_CONVERSATION: "/conversation/",
  UPDATE_JOB_DETAILS: "/conversation/job-details",
  GET_CONVERSATION_DETAILS: "/conversation/details/",
  RENAME_CONVERSATION_TITLE: "/conversation/rename/",
  DELETE_CONVERSATION: "/conversation/"
};

export default API_ENDPOINTS;
