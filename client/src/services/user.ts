import { axiosInstance } from "@/lib/api/axiosInstance"
import API_ENDPOINTS from "@/lib/api/endPoints"

export const signup = async (payload: any) => {
  const response = await axiosInstance.post(API_ENDPOINTS.SIGNUP, payload, {
    withCredentials: true,
  })
  return response.data;
}

export const login = async (payload: any) => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, payload, {
    withCredentials: true,
  })
  return response.data;
}

export const whoAmiI = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.WHO_AM_I, {
    withCredentials: true,
  })
  return response.data;
}

export const logout = async () => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGOUT, {}, {
    withCredentials: true,
  })
  return response.data;
}

export const getUserDetail = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER_DETAILS)
  return response.data;
}

export const checkPlatformProfileValidity = async (username: string, platformCode: number) => {
  const response = await axiosInstance.get(API_ENDPOINTS.CHECK_PLATFORM_PROFILE_VALIDITY + `/?username=${username}&platformCode=${platformCode}`)
  return response.data;
}

export const updatePlatformProfileDetailForUser = async (code: Number, payload: any) => {
  const response = await axiosInstance.put(API_ENDPOINTS.USER_PLATFORM_PROFILE + `/${code}`, payload)
  return response.data;
}

export const updateBasicInfoForUser = async (payload: any) => {
  const response = await axiosInstance.put(API_ENDPOINTS.USER_BASIC_INFO, payload)
  return response.data;
}

export const updateSocialsForUser = async (payload: any) => {
  const response = await axiosInstance.put(API_ENDPOINTS.USER_SOCIALS, payload)
  return response.data;
}

export const updateProfileVisibilityForUser = async (payload: any) => {
  const response = await axiosInstance.put(API_ENDPOINTS.USER_PROFILE_VISIBILITY, payload)
  return response.data;
}

export const updatePasswordForUser = async (payload: any) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.USER_PASSWORD, payload)
  return response.data;
}

export const getPlatformProfilesOfUser = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.PLATFORM_PROFILES)
  return response.data;
}

export const checkProfileNameValidity = async (profileName: string) => {
  const response = await axiosInstance.get(API_ENDPOINTS.CHECK_PROFILE_NAME_VALIDITY + `/${profileName}`)
  return response.data;
}

export const updateProfileNameOfUser = async (profileName: string) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.PROFILE_NAME + `/${profileName}`)
  return response.data;
}