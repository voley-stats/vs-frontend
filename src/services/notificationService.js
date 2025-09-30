import api from './api';

export const notificationService = {
  // Obtener notificaciones
  async getNotifications(params = {}) {
    const response = await api.get('/notifications', { params });
    return response.data;
  },

  // Obtener notificación específica
  async getNotification(id) {
    const response = await api.get(`/notifications/${id}`);
    return response.data;
  },

  // Marcar notificación como leída
  async markAsRead(id) {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  // Marcar todas las notificaciones como leídas
  async markAllAsRead() {
    const response = await api.put('/notifications/read-all');
    return response.data;
  },

  // Eliminar notificación
  async deleteNotification(id) {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },

  // Eliminar todas las notificaciones
  async deleteAllNotifications() {
    const response = await api.delete('/notifications');
    return response.data;
  },

  // Obtener contador de notificaciones no leídas
  async getUnreadCount() {
    const response = await api.get('/notifications/unread/count');
    return response.data;
  }
};
