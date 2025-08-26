import axiosInstance from "../utils/axios";

export const listTicketSubjectAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  sortConfig: { sortBy: string; sortOrder: string };
}) => {
  try {
    const response = await axiosInstance.get("/api/admin/ticket/subject", {
      params: { page: payload.pageNumber, limit: payload.pageSize },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getTicketSubjectDetailsAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/ticket/subject/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const editTicketSubjectAPI = async (payload: { id: string; subject: { en: string; ar: string } }) => {
  try {
    const response = await axiosInstance.put(`/api/admin/ticket/subject/${payload.id}`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createTicketSubjectAPI = async (payload: { subject: { en: string; ar: string } }) => {
  try {
    const response = await axiosInstance.post("/api/admin/ticket/subject", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteTicketSubjectAPI = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/admin/ticket/subject/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
