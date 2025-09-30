import apiClient from './api.js';

export const adminService = {
  // Obtener estadísticas generales del sistema
  async getSystemStats() {
    try {
      return await apiClient.get('/admin/stats');
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo estadísticas del sistema');
    }
  },

  // Obtener usuarios con filtros y paginación
  async getUsers(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });
      
      const queryString = params.toString();
      const url = queryString ? `/admin/users?${queryString}` : '/admin/users';
      
      return await apiClient.get(url);
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo usuarios');
    }
  },

  // Obtener usuario específico
  async getUser(id) {
    try {
      return await apiClient.get(`/admin/users/${id}`);
    } catch (error) {
      throw new Error(error.message || 'Usuario no encontrado');
    }
  },

  // Actualizar usuario
  async updateUser(id, userData) {
    try {
      return await apiClient.put(`/admin/users/${id}`, userData);
    } catch (error) {
      throw new Error(error.message || 'Error actualizando usuario');
    }
  },

  // Eliminar usuario
  async deleteUser(id) {
    try {
      return await apiClient.delete(`/admin/users/${id}`);
    } catch (error) {
      throw new Error(error.message || 'Error eliminando usuario');
    }
  },

  // Obtener configuración del sistema
  async getSettings() {
    try {
      return await apiClient.get('/admin/settings');
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo configuración');
    }
  },

  // Actualizar configuración del sistema
  async updateSettings(settings) {
    try {
      return await apiClient.put('/admin/settings', settings);
    } catch (error) {
      throw new Error(error.message || 'Error actualizando configuración');
    }
  },

  // Obtener analíticas
  async getAnalytics(period = '30d') {
    try {
      return await apiClient.get(`/admin/analytics?period=${period}`);
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo analíticas');
    }
  }
};
