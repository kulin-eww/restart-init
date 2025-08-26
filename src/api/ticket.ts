import axiosInstance from "../utils/axios";

export const listTicketAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
}) => {
  try {
    const response = await axiosInstance.get("/api/admin/ticket", {
      params: { page: payload.pageNumber, limit: payload.pageSize, search: payload.search, ...payload.sortConfig },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getTicketDetailsAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/ticket/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const toggleTicketStatusAPI = async (payload: { id: string; ticket_status: string }) => {
  try {
    const response = await axiosInstance.get(`/api/admin/ticket/toggle/${payload.id}/${payload.ticket_status}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// export const sendReplyTicketAPI = async (payload: { id: string; message: string }) => {
//   try {
//     const response = await axiosInstance.post(`/api/admin/ticket/1/send-reply`, payload);
//     return response.data;
//   } catch (error: any) {
//     throw error.response.data;
//   }
// };
