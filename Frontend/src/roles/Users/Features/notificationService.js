import { privateAxios } from "../../../lib/axios";

const getMyNotifications = async () => {
  const response = await privateAxios.get('/notifications');
  return response.data;
};

const markAsRead = async (id) => {
  const response = await privateAxios.patch(`/notifications/${id}/read`);
  return response.data;
};

const notificationService = {
  getMyNotifications,
  markAsRead,
};

export default notificationService;