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
  const response = await axiosInstance.put(API_ENDPOINTS.LOGOUT, {}, {
    withCredentials: true,
  })
  return response.data;
}
