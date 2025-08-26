import axiosInstance from "../utils/axios";

interface addFAQPayload {
  type: "web"| "user_app"| "driver_app"| "vendor",
  question: {
    "en": string,
    "ar": string
  },
  answer: {
    "en": string,
    "ar": string
  }
}

interface updatedFAQPayload extends addFAQPayload {
  id: string
} 

export const listFAQAPI = async ({search, pageNumber, pageSize}:{search?: string, pageNumber?: number, pageSize?:number}) => {
 const searchQuery = search ? `&search=${search}` : "";
 
  
  try {
    const response = await axiosInstance.get(`/api/admin/faq?page=${pageNumber}&limit=${pageSize}${searchQuery}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const addFAQAPI = async (payload: addFAQPayload) => {
  try {
    const response = await axiosInstance.post("/api/admin/faq", payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const changeFAQStatusAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/faq/${id}/toggle`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const faqDetailAPI = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/admin/faq/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateFaqDetailAPI = async (payload: updatedFAQPayload) => {
  const {id, ...restOfThePayload} = payload
  try {
    const response = await axiosInstance.put(`/api/admin/faq/${id}`, restOfThePayload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteFAQAPI = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/admin/faq/${id}/`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};