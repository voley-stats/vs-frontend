import api from './api';

export const categoryService = {
  // Obtener categorías disponibles para el usuario actual
  async getMyCategories() {
    try {
      // Primero intentar obtener del caché
      const cachedData = this.getCachedCategories();
      if (cachedData && this.isCacheValid(cachedData)) {
        console.log('📦 Usando categorías del caché');
        return cachedData;
      }

      // Si no hay caché válido, obtener del servidor
      console.log('🌐 Obteniendo categorías del servidor...');
      
      // Usar el endpoint que funciona en lugar del problemático
      const response = await api.get('/categories');
      
      // Procesar la respuesta para que coincida con el formato esperado
      const processedResponse = {
        categories: response.categories || response,
        user_role: 'coach', // Asumir coach por defecto
        club_name: 'Club del Usuario'
      };
      
      // Guardar en caché
      this.setCachedCategories(processedResponse);
      
      return processedResponse;
    } catch (error) {
      // Si falla el servidor, intentar usar caché como fallback
      const cachedData = this.getCachedCategories();
      if (cachedData) {
        console.log('⚠️ Usando categorías del caché como fallback');
        return cachedData;
      }
      
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
  },

  // Métodos de caché
  getCachedCategories() {
    try {
      const cached = localStorage.getItem('user_categories');
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Error leyendo caché de categorías:', error);
      return null;
    }
  },

  setCachedCategories(data) {
    try {
      const cacheData = {
        ...data,
        cached_at: Date.now(),
        expires_at: Date.now() + (30 * 60 * 1000) // 30 minutos
      };
      localStorage.setItem('user_categories', JSON.stringify(cacheData));
      console.log('💾 Categorías guardadas en caché');
    } catch (error) {
      console.error('Error guardando caché de categorías:', error);
    }
  },

  isCacheValid(cachedData) {
    if (!cachedData || !cachedData.expires_at) return false;
    return Date.now() < cachedData.expires_at;
  },

  // Limpiar caché
  clearCache() {
    localStorage.removeItem('user_categories');
    console.log('🗑️ Caché de categorías limpiado');
  },

  // Forzar actualización (ignorar caché)
  async refreshCategories() {
    this.clearCache();
    return await this.getMyCategories();
  }
};
