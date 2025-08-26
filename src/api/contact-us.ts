import axiosInstance from "../utils/axios";

export const listContactUsAPI = async ({search, pageNumber, pageSize}:{search?: string, pageNumber?: number, pageSize?:number}) => {
 const searchQuery = search ? `&search=${search}` : "";
 
  
  try {
    const response = await axiosInstance.get(`/api/admin/contact-us?page=${pageNumber}&limit=${pageSize}${searchQuery}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};