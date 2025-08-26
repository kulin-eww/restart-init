import axiosInstance from "../utils/axios";

export const loginAPI = async (payload: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post("/api/admin/auth/login", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const forgotPasswordAPI = async (payload: { email: string }) => {
  try {
    const response = await axiosInstance.post("/api/admin/auth/forgot-password", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const resetPasswordAPI = async (payload: { token: string; password: string }) => {
  try {
    const response = await axiosInstance.post("/api/admin/auth/reset-password", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const logoutAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/admin/auth/logout");
    localStorage.clear();
    sessionStorage.clear();
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
