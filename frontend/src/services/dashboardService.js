// frontend/src/services/dashboardService.js
import api from './api';

const dashboardService = {
  async getUserDashboard() {
    const response = await api.get('/dashboard');
    return response.data;
  },

  async getDashboardOverview() {
    const response = await api.get('/dashboard/overview');
    return response.data;
  },

  async getNotifications() {
    const response = await api.get('/dashboard/notifications');
    return response.data;
  },

  async markNotificationAsRead(notificationId) {
    const response = await api.patch(`/dashboard/notifications/${notificationId}/read`);
    return response.data;
  },

  async markAllNotificationsAsRead() {
    const response = await api.patch('/dashboard/notifications/read-all');
    return response.data;
  }
};

export default dashboardService;