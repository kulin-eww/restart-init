import axiosInstance from "../utils/axios";

export const listVendorAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
}) => {
  try {
    const response = await axiosInstance.get("/api/admin/vendor", {
      params: {
        page: payload.pageNumber,
        limit: payload.pageSize,
        search: payload.search,
        sortBy: payload.sortConfig.sortBy,
        order: payload.sortConfig.sortOrder,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getVendorDetailsAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/vendor/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const toggleVendorStatusAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/vendor/toggle/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteVendorAPI = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/admin/vendor/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
