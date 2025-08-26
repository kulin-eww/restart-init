import axiosInstance from "../utils/axios";

export const listReviewRatingAPI = async (payload: { pageSize: number; pageNumber: number,search: string }) => {
  try {
    const response = await axiosInstance.get("/api/admin/review-rating", {
      params: { page: payload.pageNumber, limit: payload.pageSize, search: payload.search },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getReviewRatingDetailsAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/review-rating/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteReviewRatingAPI = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/admin/review-rating/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};