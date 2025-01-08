import { env } from "@/config/env";
import axios from "axios";

const apiUrl = env.API_URL;

export const axiosInstance = axios.create({
  baseURL: apiUrl || "http://localhost:7000/api/v1/",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
})

