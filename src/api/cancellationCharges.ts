import axiosInstance from "../utils/axios";

export const getCancellationChargesDetailsAPI = async () => {
  try {
    const response = await axiosInstance.get(`/api/admin/cancellation-charge`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const editCancellationChargesAPI = async (payload: { customer_amount: string; vendor_amount: string }) => {
  try {
    const response = await axiosInstance.post(`/api/admin/cancellation-charge`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
