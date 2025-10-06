import api from './api';

export const notificationService = {
  // Obtener notificaciones activas para el usuario actual
  async getNotifications() {
    try {
      const response = await api.get('/notifications');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo notificaciones');
    }
  },

  // Obtener todas las notificaciones (solo admin)
  async getAllNotifications() {
    try {
      const response = await api.get('/notifications/admin');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo todas las notificaciones');
    }
  },

  // Crear notificación (solo admin)
  async createNotification(notificationData) {
    try {
      const response = await api.post('/notifications', notificationData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error creando notificación');
    }
  },

  // Obtener notificación por ID (solo admin)
  async getNotificationById(id) {
    try {
      const response = await api.get(`/notifications/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo notificación');
    }
  },

  // Actualizar notificación (solo admin)
  async updateNotification(id, notificationData) {
    try {
      const response = await api.put(`/notifications/${id}`, notificationData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error actualizando notificación');
    }
  },

  // Eliminar notificación (solo admin)
  async deleteNotification(id) {
    try {
      const response = await api.delete(`/notifications/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error eliminando notificación');
    }
  },

  // Activar/Desactivar notificación (solo admin)
  async toggleNotification(id) {
    try {
      const response = await api.patch(`/notifications/${id}/toggle`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error cambiando estado de notificación');
    }
  },

  // Utilidades para formatear notificaciones
  getNotificationIcon(type) {
    const icons = {
      feature_update: 'new_releases',
      improvement: 'trending_up',
      maintenance: 'build',
      announcement: 'campaign'
    };
    return icons[type] || 'info';
  },

  getNotificationColor(type, priority) {
    if (priority === 'high') {
      return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200';
    }
    
    const colors = {
      feature_update: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
      improvement: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
      maintenance: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
      announcement: 'bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-200'
    };
    
    return colors[type] || 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-200';
  },

  getPriorityBadge(priority) {
    const badges = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      low: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    };
    
    return badges[priority] || badges.medium;
  },

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};