import api from './api';

export const categoryService = {
  // Obtener categorías disponibles para el usuario actual
  async getMyCategories() {
    try {
      const response = await api.get('/categories/my-categories');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo categorías del usuario');
    }
  },

  // Obtener todas las categorías (solo para coaches/admins)
  async getAllCategories() {
    try {
      const response = await api.get('/categories');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo todas las categorías');
    }
  }
};
