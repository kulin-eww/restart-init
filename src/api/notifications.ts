import axiosInstance from "../utils/axios";

interface sendNotificationPayload {
    title: string,
    user_id?: string,
    user_type: string,
    message: string,
}

export const notificationListAPI = async({search, pageNumber, pageSize}:{search?: string, pageNumber?: number, pageSize?:number})=>{
    const searchQuery = search ? `&search=${search}` : "";
    try {
        const response = await axiosInstance.get(`/api/admin/notification?page=${pageNumber}&limit=${pageSize}${searchQuery}`);
        // const response = await axiosInstance.get(`/api/admin/notification/1`);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
}

export const notificationDetailAPI = async(id: string)=>{
    try {
        const response = await axiosInstance.get(`/api/admin/notification/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
}

export const sendBroadcastnotificationAPI = async(payload: sendNotificationPayload)=>{
    try {
        const response = await axiosInstance.post(`/api/admin/notification`, payload);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
}