import axiosInstance from "../utils/axios";

export const listVendorKYCAPI = async (payload: {
  pageSize: number;
  pageNumber: number;
  search: string;
  sortConfig: { sortBy: string; sortOrder: string };
}) => {
  try {
    const response = await axiosInstance.get("/api/admin/vendor/kyc/list", {
      params: { page: payload.pageNumber, limit: payload.pageSize, search: payload.search, ...payload.sortConfig },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getVendorKYCDetailsAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/vendor/kyc/detail/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const editVendorKYCStatusAPI = async (payload: { id: string; status: string }) => {
  try {
    const response = await axiosInstance.put(`/api/admin/vendor/kyc/status/${payload.id}`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
