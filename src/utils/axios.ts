import axios from "axios";
import useToast from "../hooks/useToast";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    config.headers.Accept = "application/json";
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    if (error.code === "ERR_NETWORK") {
      useToast(error.message, "error");
    }
    throw error;
  }
);

export default axiosInstance;
