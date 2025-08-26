import axiosInstance from "../utils/axios";

export const getAdminDetailsAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/admin/profile");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateAdminDetailsAPI = async (payload: { name: string; email: string }) => {
  try {
    const response = await axiosInstance.post("/api/admin/profile/update-profile", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const changeAdminPasswordAPI = async (payload: { oldPassword: string; newPassword: string }) => {
  try {
    const response = await axiosInstance.post("/api/admin/profile/change-password", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
