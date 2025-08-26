import axiosInstance from "../utils/axios";

export const listPricingAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  sortConfig: { sortBy: string; sortOrder: string };
}) => {
  try {
    const response = await axiosInstance.get("/api/admin/price-list", {
      params: { page: payload.pageNumber, limit: payload.pageSize },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
