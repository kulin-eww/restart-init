import axiosInstance from "../utils/axios";

export const listPromoCodeAPI = async (payload: { pageSize: number; pageNumber: number }) => {
  try {
    const response = await axiosInstance.get("/api/admin/ticket/subject", {
      params: { page: payload.pageNumber, limit: payload.pageSize },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getPromoCodeDetailsAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/ticket/subject/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const editPromoCodeAPI = async (payload: { id: string; subject: { en: string; ar: string } }) => {
  try {
    const response = await axiosInstance.put(`/api/admin/ticket/subject/${payload.id}`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createPromoCodeAPI = async (payload: { subject: { en: string; ar: string } }) => {
  try {
    const response = await axiosInstance.post("/api/admin/ticket/subject", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deletePromoCodeAPI = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/admin/ticket/subject/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
