import { axiosInstance } from "@/lib/api/axiosInstance"
import API_ENDPOINTS from "@/lib/api/endPoints"

export const extractAndCreateResume = async (payload: any) => {
  const response = await axiosInstance.post(API_ENDPOINTS.EXTRACT_AND_CREATE_RESUME, payload)
  return response.data;
}